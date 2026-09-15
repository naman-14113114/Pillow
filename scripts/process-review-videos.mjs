import { execFile } from "node:child_process";
import { promisify } from "node:util";
import fs from "node:fs/promises";
import path from "node:path";

const execFileAsync = promisify(execFile);

const SOURCE_DIR = "E:\\1st YEAR DTU\\New folder\\ruuhu_pillow_review_videos\\Selected and edited Videos";
const TARGET_DIR = "e:\\1st YEAR DTU\\New folder\\Pillow\\public\\videos\\pillow-reviews";
const CLIPS_DIR = path.join(TARGET_DIR, "clips");
const POSTERS_DIR = path.join(TARGET_DIR, "posters");

const videoFiles = [
  "Rest-Align Pillow Videos-1.mp4",
  "Rest-Align Pillow Videos-2.mp4",
  "Rest-Align Pillow Videos-3.mp4",
  "Rest-Align Pillow Videos-4.mp4",
  "Rest-Align Pillow Videos-5.mp4",
  "Rest-Align Pillow Videos-6s.mp4",
  "Rest-Align Pillow Videos-7.mp4",
  "Rest-Align Pillow Videos-8.mp4",
  "Rest-Align Pillow Videos-9.mp4",
  "Rest-Align Pillow Videos-10s.mp4",
  "Rest-Align Pillow Videos-11.mp4",
  "Rest-Align Pillow Videos-12s.mp4",
  "Rest-Align Pillow Videos-13s.mp4",
  "Rest-Align Pillow Videos-14.mp4",
  "Rest-Align Pillow Videos-15.mp4",
  "Rest-Align Pillow Videos-16s.mp4",
  "Rest-Align Pillow Videos-17s.mp4",
  "Rest-Align Pillow Videos-18.mp4",
  "Rest-Align Pillow Videos-19s.mp4",
  "Rest-Align Pillow Videos-20.mp4",
  "Rest-Align Pillow Videos-21s.mp4",
  "Rest-Align Pillow Videos-22.mp4",
  "Rest-Align Pillow Videos-23s.mp4",
  "Rest-Align Pillow Videos-24.mp4",
  "Rest-Align Pillow Videos-25s.mp4",
  "Rest-Align Pillow Videos-26s.mp4",
  "Rest-Align Pillow Videos-27s.mp4",
  "Rest-Align Pillow Videos-28.mp4",
  "Rest-Align Pillow Videos-29.mp4",
  "Rest-Align Pillow Videos-30s.mp4"
];

async function processVideo(filename, index) {
  const num = String(index + 1).padStart(2, "0");
  const inputPath = path.join(SOURCE_DIR, filename);
  const fullDest = path.join(TARGET_DIR, `pillow-review-${num}.mp4`);
  const clipDest = path.join(CLIPS_DIR, `pillow-review-${num}-clip.mp4`);
  const posterDest = path.join(POSTERS_DIR, `pillow-review-${num}-poster.jpg`);

  console.log(`[${num}/30] Processing: ${filename}...`);

  // 1. Copy full video
  try {
    await fs.copyFile(inputPath, fullDest);
    console.log(`[${num}/30] Copied full video -> pillow-review-${num}.mp4`);
  } catch (err) {
    console.error(`[${num}/30] Error copying full video:`, err);
  }

  // 2. Generate 4.5s lightweight preview clip for carousel
  try {
    await execFileAsync("ffmpeg", [
      "-y",
      "-ss", "0",
      "-t", "4.5",
      "-i", inputPath,
      "-vf", "scale=480:-2",
      "-c:v", "libx264",
      "-preset", "fast",
      "-crf", "24",
      "-an",
      "-movflags", "+faststart",
      clipDest
    ]);
    console.log(`[${num}/30] Generated clip -> pillow-review-${num}-clip.mp4`);
  } catch (err) {
    console.error(`[${num}/30] Error generating clip for ${filename}:`, err.message);
  }

  // 3. Generate poster image
  try {
    await execFileAsync("ffmpeg", [
      "-y",
      "-ss", "0.5",
      "-i", inputPath,
      "-vf", "scale=480:-2",
      "-vframes", "1",
      "-q:v", "2",
      posterDest
    ]);
    console.log(`[${num}/30] Generated poster -> pillow-review-${num}-poster.jpg`);
  } catch (err) {
    console.error(`[${num}/30] Error generating poster for ${filename}:`, err.message);
  }
}

async function runPool(concurrency = 4) {
  console.log(`Starting processing of ${videoFiles.length} videos with concurrency ${concurrency}...`);
  const tasks = videoFiles.map((f, i) => () => processVideo(f, i));
  let index = 0;

  async function worker() {
    while (index < tasks.length) {
      const current = tasks[index++];
      await current();
    }
  }

  const workers = Array.from({ length: concurrency }, () => worker());
  await Promise.all(workers);
  console.log("ALL 30 VIDEOS PROCESSED SUCCESSFULLY!");
}

runPool(4);
