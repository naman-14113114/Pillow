import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Get arguments from command line
const args = process.argv.slice(2);
if (args.length < 1 || args.length > 2 || isNaN(parseInt(args[0], 10))) {
  console.error("Usage: node update-review-dates.js <number_of_days> [product_handle]");
  console.error("Examples:");
  console.error("  node update-review-dates.js 46                        (Updates ALL products across all datasets)");
  console.error("  node update-review-dates.js 46 licensed-product       (Updates ONLY licensed-product-reviews)");
  process.exit(1);
}

const daysToAdd = parseInt(args[0], 10);
const targetProduct = args[1]; // Optional second argument

const rootDir = __dirname;
const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

if (targetProduct) {
  console.log(`Shifting review dates forward by ${daysToAdd} days for ${targetProduct} ONLY...`);
} else {
  console.log(`Shifting review dates forward by ${daysToAdd} days for ALL products across all datasets...`);
}

let totalUpdated = 0;
let totalFiles = 0;

// Collect all possible review files in both single-app and monorepo structures
const reviewFiles = [];

// 1. Check root / src/data
const srcDataDir = path.join(rootDir, "src", "data");
if (fs.existsSync(srcDataDir)) {
  const files = fs.readdirSync(srcDataDir).filter((f) => f.includes("review") && f.endsWith(".json"));
  files.forEach((f) => reviewFiles.push(path.join(srcDataDir, f)));
  
  const reviewsSubDir = path.join(srcDataDir, "reviews");
  if (fs.existsSync(reviewsSubDir)) {
    const subFiles = fs.readdirSync(reviewsSubDir).filter((f) => f.endsWith(".json"));
    subFiles.forEach((f) => reviewFiles.push(path.join(reviewsSubDir, f)));
  }
}

// 2. Check apps/<country>/src/data
const appsDir = path.join(rootDir, "apps");
const countries = ["us", "uk", "ca", "au"];
if (fs.existsSync(appsDir)) {
  countries.forEach((country) => {
    const countryDataDir = path.join(appsDir, country, "src", "data");
    if (fs.existsSync(countryDataDir)) {
      const files = fs.readdirSync(countryDataDir).filter((f) => f.includes("review") && f.endsWith(".json"));
      files.forEach((f) => reviewFiles.push(path.join(countryDataDir, f)));

      const reviewsDir = path.join(countryDataDir, "reviews");
      if (fs.existsSync(reviewsDir)) {
        const subFiles = fs.readdirSync(reviewsDir).filter((f) => f.endsWith(".json"));
        subFiles.forEach((f) => reviewFiles.push(path.join(reviewsDir, f)));
      }
    }
  });
}

function shiftDateString(dateStr, days) {
  if (!dateStr || typeof dateStr !== "string") return null;

  // Format 1: "D MMMM YYYY" (e.g. "1 August 2025", "15 August 2026")
  const words = dateStr.trim().split(/\s+/);
  if (words.length === 3 && monthNames.includes(words[1])) {
    const day = parseInt(words[0], 10);
    const month = monthNames.indexOf(words[1]);
    const year = parseInt(words[2], 10);

    if (!isNaN(day) && month !== -1 && !isNaN(year)) {
      const d = new Date(Date.UTC(year, month, day));
      d.setUTCDate(d.getUTCDate() + days);
      return `${d.getUTCDate()} ${monthNames[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
    }
  }

  // Format 2: "YYYY-MM-DD" or "YYYY-MM-DD 00:00:00 +0000 UTC"
  if (dateStr.length >= 10 && /^\d{4}-\d{2}-\d{2}/.test(dateStr)) {
    const isoDateStr = dateStr.substring(0, 10);
    const d = new Date(`${isoDateStr}T00:00:00.000Z`);
    if (!isNaN(d.getTime())) {
      d.setUTCDate(d.getUTCDate() + days);
      const yyyy = d.getUTCFullYear();
      const mm = String(d.getUTCMonth() + 1).padStart(2, "0");
      const dd = String(d.getUTCDate()).padStart(2, "0");
      const newIsoStr = `${yyyy}-${mm}-${dd}`;
      if (dateStr.includes("UTC")) {
        return `${newIsoStr} 00:00:00 +0000 UTC`;
      }
      return newIsoStr;
    }
  }

  // Fallback generic Date parse
  const fallback = new Date(dateStr);
  if (!isNaN(fallback.getTime())) {
    fallback.setUTCDate(fallback.getUTCDate() + days);
    return `${fallback.getUTCDate()} ${monthNames[fallback.getUTCMonth()]} ${fallback.getUTCFullYear()}`;
  }

  return null;
}

reviewFiles.forEach((filePath) => {
  const fileName = path.basename(filePath);

  if (targetProduct) {
    const targetBase = targetProduct.replace(/\.json$/, "");
    if (!fileName.includes(targetBase)) {
      return;
    }
  }

  try {
    const fileContent = fs.readFileSync(filePath, "utf8");
    const parsedData = JSON.parse(fileContent);

    let reviewsArray = null;
    let isWrapped = false;

    if (Array.isArray(parsedData)) {
      reviewsArray = parsedData;
    } else if (parsedData && Array.isArray(parsedData.reviews)) {
      reviewsArray = parsedData.reviews;
      isWrapped = true;
    }

    if (!reviewsArray) {
      console.warn(`Skipping non-array review format: ${filePath}`);
      return;
    }

    let fileUpdatedCount = 0;

    reviewsArray.forEach((review) => {
      if (review.date) {
        const updatedDate = shiftDateString(review.date, daysToAdd);
        if (updatedDate) {
          review.date = updatedDate;
          if (review.displayDate !== undefined) {
            const updatedDisplay = shiftDateString(review.displayDate, daysToAdd);
            if (updatedDisplay) review.displayDate = updatedDisplay;
          }
          fileUpdatedCount++;
        }
      }
    });

    // If source metadata has importedAt, shift that too
    if (isWrapped && parsedData.source && parsedData.source.importedAt) {
      const updatedImportedAt = shiftDateString(parsedData.source.importedAt, daysToAdd);
      if (updatedImportedAt) {
        parsedData.source.importedAt = updatedImportedAt;
      }
    }

    // Save with identical JSON format (compact single-line matching original)
    const isSingleLine = !fileContent.includes("\n") || fileContent.split("\n").length <= 2;
    const outputContent = isSingleLine
      ? JSON.stringify(parsedData)
      : JSON.stringify(parsedData, null, 2) + "\n";

    fs.writeFileSync(filePath, outputContent, "utf8");
    const relativePath = path.relative(rootDir, filePath).replace(/\\/g, "/");
    console.log(`Updated ${fileUpdatedCount} reviews in ${relativePath}`);
    totalUpdated += fileUpdatedCount;
    totalFiles++;
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error);
  }
});

console.log(`\nSuccessfully shifted dates forward by ${daysToAdd} days for ${totalUpdated} total reviews across ${totalFiles} file(s).`);
