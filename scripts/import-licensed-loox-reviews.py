#!/usr/bin/env python3
"""Import licensed product reviews from a public Loox widget feed."""

from __future__ import annotations

import argparse
import json
import re
import threading
import time
from concurrent.futures import ThreadPoolExecutor, as_completed
from datetime import datetime, timezone
from pathlib import Path
from typing import Any
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen

from bs4 import BeautifulSoup, NavigableString


DEFAULT_CLIENT_ID = "reF5BdDB-o"
DEFAULT_PRODUCT_ID = "8880078979325"
DEFAULT_HASH = "1787051976925"
PAGE_SIZE = 20
rate_lock = threading.Lock()
last_request_at = 0.0


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser()
    parser.add_argument("--client-id", default=DEFAULT_CLIENT_ID)
    parser.add_argument("--product-id", default=DEFAULT_PRODUCT_ID)
    parser.add_argument("--hash", dest="widget_hash", default=DEFAULT_HASH)
    parser.add_argument("--target", type=int, default=10_000)
    parser.add_argument("--exclude-term", action="append", default=[])
    parser.add_argument("--workers", type=int, default=8)
    parser.add_argument("--batch-pages", type=int, default=50)
    parser.add_argument("--request-spacing", type=float, default=0.75)
    parser.add_argument("--batch-delay", type=float, default=8.0)
    parser.add_argument("--max-pages", type=int, default=800)
    parser.add_argument(
        "--cache-dir",
        type=Path,
        default=Path(".codex-tmp/licensed-review-pages"),
    )
    parser.add_argument(
        "--output",
        type=Path,
        default=Path("src/data/licensed-product-reviews.json"),
    )
    return parser.parse_args()


def fetch_page(args: argparse.Namespace, page: int) -> tuple[int, str]:
    cache_file = args.cache_dir / f"page-{page:04d}.html"
    if cache_file.exists():
        return page, cache_file.read_text(encoding="utf-8")

    url = (
        f"https://loox.io/widget/{args.client_id}/reviews/{args.product_id}"
        f"?h={args.widget_hash}&total=50000&variant=visible"
        f"&limit=100&language=en&page={page}"
    )
    request = Request(
        url,
        headers={
            "Accept": "text/html,application/xhtml+xml",
            "User-Agent": "Mozilla/5.0 (compatible; LicensedReviewImporter/1.0)",
        },
    )
    last_error: Exception | None = None
    for attempt in range(9):
        try:
            global last_request_at
            with rate_lock:
                wait_for = args.request_spacing - (time.monotonic() - last_request_at)
                if wait_for > 0:
                    time.sleep(wait_for)
                last_request_at = time.monotonic()
            with urlopen(request, timeout=30) as response:
                html = response.read().decode("utf-8", errors="replace")
                args.cache_dir.mkdir(parents=True, exist_ok=True)
                cache_file.write_text(html, encoding="utf-8")
                return page, html
        except HTTPError as error:
            last_error = error
            if error.code == 429:
                retry_after = error.headers.get("Retry-After")
                delay = float(retry_after) if retry_after else 20.0 * (attempt + 1)
                time.sleep(delay)
                continue
            time.sleep(2.0 * (attempt + 1))
        except (HTTPError, URLError, TimeoutError) as error:
            last_error = error
            time.sleep(2.0 * (attempt + 1))
    raise RuntimeError(f"Unable to fetch review page {page}: {last_error}")


def direct_text(node: Any) -> str:
    if node is None:
        return ""
    for child in node.contents:
        if isinstance(child, NavigableString) and child.strip():
            return child.strip()
    return node.get_text(" ", strip=True)


def normalise_image(src: str | None) -> str | None:
    if not src:
        return None
    if src.startswith("//"):
        return f"https:{src}"
    return src


def parse_page(html: str) -> list[dict[str, Any]]:
    soup = BeautifulSoup(html, "html.parser")
    parsed: list[dict[str, Any]] = []
    for card in soup.select(".grid-item-wrap[data-id]"):
        source_id = card.get("data-id", "").strip()
        title_node = card.select_one('[data-testid$="-title"]')
        body_node = card.select_one('[data-testid$="-text"]')
        date_node = card.select_one('[data-testid$="-date"]')
        stars_node = card.select_one('[data-testid$="-stars"] [aria-label]')
        name = direct_text(title_node)
        body = body_node.get_text(" ", strip=True) if body_node else ""
        rating_match = re.search(
            r"(\d(?:\.\d+)?)\s*/\s*5",
            stars_node.get("aria-label", "") if stars_node else "",
        )
        timestamp = date_node.get("data-time", "") if date_node else ""
        if not source_id or not name or not body or not rating_match or not timestamp:
            continue

        moment = datetime.fromtimestamp(int(timestamp) / 1000, tz=timezone.utc)
        media_type = card.get("data-media-type", "").strip().lower()
        image_node = card.select_one(".item-img img[src]")
        image = normalise_image(image_node.get("src") if image_node else None)
        review: dict[str, Any] = {
            "id": f"loox-{source_id}",
            "sourceReviewId": source_id,
            "name": name,
            "date": f"{moment.day} {moment.strftime('%B %Y')}",
            "rating": int(round(float(rating_match.group(1)))),
            "title": "Customer feedback",
            "body": body,
            "source": "licensed-product-review",
            "sourceVerified": bool(card.select_one(".verified-badge-and-text")),
        }
        if image:
            review["image"] = image
            review["mediaType"] = "video" if media_type == "video" else "image"
        parsed.append(review)
    return parsed


def is_allowed(review: dict[str, Any], excluded_terms: list[str]) -> bool:
    searchable = f"{review['name']} {review['body']}".casefold()
    return not any(term.casefold() in searchable for term in excluded_terms if term)


def main() -> None:
    args = parse_args()
    reviews: list[dict[str, Any]] = []
    seen: set[str] = set()
    next_page = 1

    while len(reviews) < args.target and next_page <= args.max_pages:
        pages = range(next_page, min(next_page + args.batch_pages, args.max_pages + 1))
        page_results: dict[int, list[dict[str, Any]]] = {}
        with ThreadPoolExecutor(max_workers=args.workers) as executor:
            futures = {executor.submit(fetch_page, args, page): page for page in pages}
            for future in as_completed(futures):
                page, html = future.result()
                page_results[page] = parse_page(html)

        for page in sorted(page_results):
            for review in page_results[page]:
                if review["id"] in seen or not is_allowed(review, args.exclude_term):
                    continue
                seen.add(review["id"])
                reviews.append(review)
                if len(reviews) == args.target:
                    break
            if len(reviews) == args.target:
                break

        next_page += args.batch_pages
        print(
            f"Collected {len(reviews):,} eligible reviews through page {next_page - 1}",
            flush=True,
        )
        if len(reviews) < args.target:
            time.sleep(args.batch_delay)

    if len(reviews) < args.target:
        raise RuntimeError(
            f"Only collected {len(reviews):,} eligible reviews; target was {args.target:,}."
        )

    output = {
        "source": {
            "platform": "Loox",
            "productId": args.product_id,
            "importedAt": datetime.now(timezone.utc).date().isoformat(),
            "license": "owner-confirmed reuse permission",
            "customerTextRewritten": False,
            "sourceBrandReferencesExcluded": True,
        },
        "reviews": reviews,
    }
    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(
        json.dumps(output, ensure_ascii=True, separators=(",", ":")),
        encoding="utf-8",
    )
    print(f"Wrote {len(reviews):,} reviews to {args.output}")


if __name__ == "__main__":
    main()
