#!/usr/bin/env node

/**
 * Shuffle Gallery Manifest
 *
 * This script shuffles the images within each category in the gallery manifest.
 * The shuffle happens once and persists, so the gallery looks random but stays
 * consistent across page reloads.
 *
 * Usage:
 *   node scripts/shuffle-gallery-manifest.js
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MANIFEST_PATH = path.join(__dirname, "../public/gallery/manifest.json");

// Fisher-Yates shuffle algorithm
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

function loadManifest() {
    try {
        const data = fs.readFileSync(MANIFEST_PATH, "utf8");
        return JSON.parse(data);
    } catch (error) {
        console.error("Error loading manifest:", error.message);
        process.exit(1);
    }
}

function saveManifest(manifest) {
    try {
        fs.writeFileSync(
            MANIFEST_PATH,
            JSON.stringify(manifest, null, 4),
            "utf8"
        );
        console.log("✅ Manifest shuffled successfully!");
    } catch (error) {
        console.error("Error saving manifest:", error.message);
        process.exit(1);
    }
}

function shuffleManifest() {
    console.log("🎲 Shuffling gallery manifest...\n");

    const manifest = loadManifest();
    const shuffledManifest = {};

    // Shuffle each category
    Object.entries(manifest).forEach(([category, images]) => {
        const originalCount = images.length;
        shuffledManifest[category] = shuffleArray(images);
        console.log(
            `  ${category.padEnd(12)} : ${originalCount} images shuffled`
        );
    });

    saveManifest(shuffledManifest);

    console.log("\n✨ Gallery images are now in a random order!");
    console.log(
        "   They will appear this way consistently across page reloads."
    );
}

// Run the shuffle
shuffleManifest();
