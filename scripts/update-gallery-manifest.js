#!/usr/bin/env node

/**
 * Gallery Manifest Helper Script
 *
 * This script helps you manage your gallery manifest by adding or removing images.
 *
 * Usage:
 *   node scripts/update-gallery-manifest.js add Community rugby-community_1234.jpg
 *   node scripts/update-gallery-manifest.js remove Match rugby-match_5678.jpg
 *   node scripts/update-gallery-manifest.js list
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MANIFEST_PATH = path.join(__dirname, "../public/gallery/manifest.json");
const VALID_CATEGORIES = ["Community", "Match", "Players", "Team", "Training"];

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
            JSON.stringify(manifest, null, 2),
            "utf8"
        );
        console.log("✅ Manifest updated successfully!");
    } catch (error) {
        console.error("Error saving manifest:", error.message);
        process.exit(1);
    }
}

function addImage(category, filename) {
    if (!VALID_CATEGORIES.includes(category)) {
        console.error(`❌ Invalid category: ${category}`);
        console.log(`Valid categories: ${VALID_CATEGORIES.join(", ")}`);
        process.exit(1);
    }

    const manifest = loadManifest();

    if (!manifest[category]) {
        manifest[category] = [];
    }

    if (manifest[category].includes(filename)) {
        console.log(`⚠️  Image already exists: ${filename}`);
        return;
    }

    manifest[category].push(filename);
    saveManifest(manifest);
    console.log(`✅ Added ${filename} to ${category}`);
}

function removeImage(category, filename) {
    if (!VALID_CATEGORIES.includes(category)) {
        console.error(`❌ Invalid category: ${category}`);
        console.log(`Valid categories: ${VALID_CATEGORIES.join(", ")}`);
        process.exit(1);
    }

    const manifest = loadManifest();

    if (!manifest[category] || !manifest[category].includes(filename)) {
        console.log(`⚠️  Image not found: ${filename} in ${category}`);
        return;
    }

    manifest[category] = manifest[category].filter((f) => f !== filename);
    saveManifest(manifest);
    console.log(`✅ Removed ${filename} from ${category}`);
}

function listImages() {
    const manifest = loadManifest();
    console.log("\n📸 Gallery Manifest Overview:\n");

    let totalImages = 0;
    VALID_CATEGORIES.forEach((category) => {
        const count = manifest[category]?.length || 0;
        totalImages += count;
        console.log(`  ${category.padEnd(12)} : ${count} images`);
    });

    console.log(`\n  Total        : ${totalImages} images\n`);
}

function showHelp() {
    console.log(`
Gallery Manifest Manager

Usage:
  node scripts/update-gallery-manifest.js <command> [options]

Commands:
  add <category> <filename>     Add an image to a category
  remove <category> <filename>  Remove an image from a category
  list                          Show all categories and counts
  help                          Show this help message

Categories:
  ${VALID_CATEGORIES.join(", ")}

Examples:
  node scripts/update-gallery-manifest.js add Community rugby-community_1234.jpg
  node scripts/update-gallery-manifest.js remove Match rugby-match_5678.jpg
  node scripts/update-gallery-manifest.js list

NPM Shortcuts:
  npm run gallery:list
  npm run gallery:add Community rugby-community_1234.jpg
  npm run gallery:remove Match rugby-match_5678.jpg
    `);
}

// Main execution
const [, , command, arg1, arg2] = process.argv;

switch (command) {
    case "add":
        if (!arg1 || !arg2) {
            console.error("❌ Usage: add <category> <filename>");
            process.exit(1);
        }
        addImage(arg1, arg2);
        break;

    case "remove":
        if (!arg1 || !arg2) {
            console.error("❌ Usage: remove <category> <filename>");
            process.exit(1);
        }
        removeImage(arg1, arg2);
        break;

    case "list":
        listImages();
        break;

    case "help":
    default:
        showHelp();
        break;
}
