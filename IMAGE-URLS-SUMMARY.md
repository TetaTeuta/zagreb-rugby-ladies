# Image URLs Summary - CDN Migration

## Overview

This document lists all images and their URL types after CDN migration.

---

## 🔗 URL Types Used

### 1. **Direct URLs** (Full CDN URLs)

Used in: **JSON data files only**
Format: `https://pub-5f5af9bd433747e5bee00f6003bc4d76.r2.dev/category/filename.ext`

### 2. **Relative Paths with `cdn()` Helper**

Used in: **All component files**
Format: `cdn("category/filename.ext")`
Resolves to: `https://pub-5f5af9bd433747e5bee00f6003bc4d76.r2.dev/category/filename.ext`

---

## 📁 DIRECT URLs (JSON Data Files)

### `src/data/players.json`

**8 occurrences** - Placeholder images for players without photos

```json
"profilePhoto": "https://pub-5f5af9bd433747e5bee00f6003bc4d76.r2.dev/players/siluette_placeholder_rugby_ladies.png"
"bannerPhoto": "https://pub-5f5af9bd433747e5bee00f6003bc4d76.r2.dev/players/siluette_placeholder_rugby_ladies.png"
```

**Players using placeholder:**

1. Morena Ivček
2. Ivona Šojić
3. Lana Emanović
4. Cvita Seiter
5. Lucija Zorić
6. Lora Aladrović
7. Barbara Debeljak
8. Jelena Ivančić

### `src/data/nextMatch.json`

**2 occurrences** - Team logos

```json
"logo": "https://pub-5f5af9bd433747e5bee00f6003bc4d76.r2.dev/logos/zagreb-rugby-ladies-logo-vector.png"
"logo": "https://pub-5f5af9bd433747e5bee00f6003bc4d76.r2.dev/logos/nada-rugby-logo.jpeg"
```

### `src/data/schedule.json`

**2 occurrences** - Team logo

```json
"logo": "https://pub-5f5af9bd433747e5bee00f6003bc4d76.r2.dev/logos/zagreb-rugby-ladies-logo-vector.png"
```

**Total Direct URLs: 12**

---

## 🔧 RELATIVE PATHS with cdn() Helper

### Page Components

#### `src/pages/Home.jsx`

```javascript
cdn("hero/josipa-rugby-action.jpg"); // Hero image
cdn("call_to_action/rugby-player-scrum.jpg"); // CTA image
```

#### `src/pages/About.jsx`

```javascript
cdn("players/siluette_placeholder_rugby_ladies.png"); // Coach placeholder (2x)
cdn("logos/zagreb-rugby-ladies-logo-vector.png"); // SEO/Article image
cdn("hero/petra-rugby-action.jpg"); // Hero image
cdn("call_to_action/rugby-player-woman-ball.jpg"); // CTA image
```

#### `src/pages/Team.jsx`

```javascript
cdn("hero/zagreb-rugby-ladies-team-action.jpg"); // Hero image
cdn("call_to_action/rugby-player-woman-with-ball.jpg"); // CTA image
```

#### `src/pages/Schedule.jsx`

```javascript
cdn("hero/margaux-rugby-action.jpg"); // Hero image
cdn("call_to_action/rugby-scrum-action.jpg"); // CTA image
```

#### `src/pages/Rugby101.jsx`

```javascript
cdn("logos/zagreb-rugby-ladies-logo-vector.png"); // SEO images (3x)
cdn("hero/zagreb-rugby-ladies-team-running.jpg"); // Hero image
cdn("call_to_action/rugby-players-woman-team.jpg"); // CTA image
```

#### `src/pages/Contact.jsx`

```javascript
cdn("hero/zagreb-rugby-ladies-team.jpg"); // Hero image
cdn("call_to_action/rugby-player-woman-panning-running.jpg"); // CTA image
```

#### `src/pages/Gallery.jsx`

```javascript
cdn("hero/josipa-rugby-kick.jpg"); // Hero image
cdn("call_to_action/rugby-team-woman-shot.jpg"); // CTA image
```

---

### Layout Components

#### `src/components/layout/Header.jsx`

```javascript
cdn("logos/zagreb-rugby-ladies-logo-vector.png"); // Header logo
```

#### `src/components/layout/Footer.jsx`

```javascript
cdn("logos/zagreb-rugby-ladies-logo-vector.png"); // Footer logo
```

#### `src/components/layout/MobileSidebar.jsx`

```javascript
cdn("logos/zagreb-rugby-ladies-logo-vector.png"); // Mobile menu logo
```

#### `src/components/layout/Sponsors.jsx`

✅ Uses ES6 imports (already working correctly)

```javascript
import buzzLogo from "../../assets/images/sponsors/buzz_logo.png";
import divlabLogo from "../../assets/images/sponsors/divlab_logo.png";
import funkyGeorgeLogo from "../../assets/images/sponsors/funky_george_logo.png";
import gressLogo from "../../assets/images/sponsors/gress_logo.png";
import medvedgradLogo from "../../assets/images/sponsors/medvedgrad_logo.png";
import muringLogo from "../../assets/images/sponsors/muring_logo.png";
import simtecLogo from "../../assets/images/sponsors/simtec_logo.png";
import submarineLogo from "../../assets/images/sponsors/submarine_logo.png";
```

---

### Other Components

#### `src/components/ui/SEO.jsx`

```javascript
cdn("logos/zagreb-rugby-ladies-logo-vector.png"); // Default image (3x)
```

#### `src/components/home/MatchSchedule.jsx`

```javascript
cdn("logos/zagreb-rugby-ladies-logo-vector.png"); // Team logos (2x)
cdn("logos/nada-rugby-logo.jpeg"); // Opponent logos (4x)
```

#### `src/components/team/PlayerCard.jsx`

```javascript
cdn("players/petra_rugby.jpg"); // Placeholder array (7 images)
cdn("players/lucija_rugby.jpg");
cdn("players/manuela_rugby.jpg");
cdn("players/margaux_rugby.jpg");
cdn("players/teuta_rugby.jpg");
cdn("players/josipa_rugby.jpg");
cdn("players/petra1_rugby.jpg");
```

**Total Relative Paths with cdn(): ~31**

---

## 📊 Complete Image Inventory

### Hero Images (7 files) - **Relative with cdn()**

-   ✅ `cdn("hero/josipa-rugby-action.jpg")` - Home.jsx
-   ✅ `cdn("hero/josipa-rugby-kick.jpg")` - Gallery.jsx
-   ✅ `cdn("hero/margaux-rugby-action.jpg")` - Schedule.jsx
-   ✅ `cdn("hero/petra-rugby-action.jpg")` - About.jsx
-   ✅ `cdn("hero/zagreb-rugby-ladies-team-action.jpg")` - Team.jsx
-   ✅ `cdn("hero/zagreb-rugby-ladies-team-running.jpg")` - Rugby101.jsx
-   ✅ `cdn("hero/zagreb-rugby-ladies-team.jpg")` - Contact.jsx

### Call-to-Action Images (7 files) - **Relative with cdn()**

-   ✅ `cdn("call_to_action/rugby-player-scrum.jpg")` - Home.jsx
-   ✅ `cdn("call_to_action/rugby-player-woman-ball.jpg")` - About.jsx
-   ✅ `cdn("call_to_action/rugby-player-woman-panning-running.jpg")` - Contact.jsx
-   ✅ `cdn("call_to_action/rugby-player-woman-with-ball.jpg")` - Team.jsx
-   ✅ `cdn("call_to_action/rugby-players-woman-team.jpg")` - Rugby101.jsx
-   ✅ `cdn("call_to_action/rugby-scrum-action.jpg")` - Schedule.jsx
-   ✅ `cdn("call_to_action/rugby-team-woman-shot.jpg")` - Gallery.jsx

### Logo Images (4 files)

#### Zagreb Rugby Ladies Logo - **Mixed**

**Relative with cdn():**

-   Header.jsx
-   Footer.jsx
-   MobileSidebar.jsx
-   SEO.jsx (3 occurrences)
-   Rugby101.jsx (3 occurrences)
-   About.jsx (1 occurrence)
-   MatchSchedule.jsx (2 occurrences)

**Direct URL:**

-   nextMatch.json (1 occurrence)
-   schedule.json (2 occurrences)

#### Other Logos

-   ✅ `cdn("logos/nada-rugby-logo.jpeg")` - MatchSchedule.jsx (4x) - **Relative**
-   🔗 Direct URL in nextMatch.json - **Direct**

### Player Images (11 files)

#### Siluette Placeholder - **Direct URL**

-   🔗 `https://pub-5f5af9bd433747e5bee00f6003bc4d76.r2.dev/players/siluette_placeholder_rugby_ladies.png`
    -   players.json (8 players × 2 = 16 occurrences)
    -   About.jsx coaches (2 occurrences via cdn())

#### Player Photos - **Relative with cdn()**

-   ✅ `cdn("players/petra_rugby.jpg")` - PlayerCard.jsx
-   ✅ `cdn("players/lucija_rugby.jpg")` - PlayerCard.jsx
-   ✅ `cdn("players/manuela_rugby.jpg")` - PlayerCard.jsx
-   ✅ `cdn("players/margaux_rugby.jpg")` - PlayerCard.jsx
-   ✅ `cdn("players/teuta_rugby.jpg")` - PlayerCard.jsx
-   ✅ `cdn("players/josipa_rugby.jpg")` - PlayerCard.jsx
-   ✅ `cdn("players/petra1_rugby.jpg")` - PlayerCard.jsx

#### Unused Player Images (Available in repo)

-   `players/rugby-woman-dina-free-kick.jpg`
-   `players/rugby-woman-dina-kick.jpg`
-   `players/rugby-woman-training-out-lift.jpg`

### Sponsor Logos (8 files) - **ES6 Imports**

-   ✅ `buzz_logo.png` - Sponsors.jsx
-   ✅ `divlab_logo.png` - Sponsors.jsx
-   ✅ `funky_george_logo.png` - Sponsors.jsx
-   ✅ `gress_logo.png` - Sponsors.jsx
-   ✅ `medvedgrad_logo.png` - Sponsors.jsx
-   ✅ `muring_logo.png` - Sponsors.jsx
-   ✅ `simtec_logo.png` - Sponsors.jsx
-   ✅ `submarine_logo.png` - Sponsors.jsx

---

## 📈 Statistics

| Category                | Direct URLs | cdn() Relative | ES6 Import | Total   |
| ----------------------- | ----------- | -------------- | ---------- | ------- |
| **Hero Images**         | 0           | 7              | 0          | 7       |
| **CTA Images**          | 0           | 7              | 0          | 7       |
| **Logo Images**         | 3           | 12+            | 0          | 15+     |
| **Player Placeholders** | 16          | 2              | 0          | 18      |
| **Player Photos**       | 0           | 7              | 0          | 7       |
| **Sponsor Logos**       | 0           | 0              | 8          | 8       |
| **TOTAL**               | **19**      | **35+**        | **8**      | **62+** |

---

## 🎯 Usage Pattern Summary

### ✅ Use DIRECT URLs when:

-   Storing in JSON data files
-   Need to ensure consistency across data
-   External API/data consumption

### ✅ Use cdn() RELATIVE when:

-   In React components (JSX)
-   Dynamic image loading
-   Allows environment flexibility via VITE_R2_BASE_URL

### ✅ Use ES6 IMPORTS when:

-   Images need to be bundled with app
-   Small logos/icons
-   Vite optimization desired

---

## 🔧 cdn() Helper Function

Located in: `src/lib/cdn.js`

```javascript
export const cdn = (path) => {
    const baseUrl = import.meta.env.VITE_R2_BASE_URL || "";
    if (!baseUrl) return path;
    const cleanPath = path.startsWith("/") ? path.substring(1) : path;
    return `${baseUrl}/${cleanPath}`;
};
```

**Environment Variable:**

```
VITE_R2_BASE_URL=https://pub-5f5af9bd433747e5bee00f6003bc4d76.r2.dev
```

---

## 🔍 Quick Reference

### Finding Images in Code:

**Direct URLs:**

```bash
grep -r "https://pub-5f5af9bd433747e5bee00f6003bc4d76.r2.dev" src/
```

**cdn() Usage:**

```bash
grep -r "cdn(" src/
```

**ES6 Imports:**

```bash
grep -r "from.*assets/images" src/
```

---

**Last Updated:** $(date)  
**Total Images:** 62+  
**All Images Hosted On:** Cloudflare R2
