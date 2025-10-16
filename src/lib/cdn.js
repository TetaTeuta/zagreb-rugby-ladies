/**
 * Cloudflare R2 CDN Utilities
 *
 * Environment Variable Required:
 * VITE_R2_BASE_URL=https://pub-5f5af9bd433747e5bee00f6003bc4d76.r2.dev
 *
 * Add to your .env file:
 * VITE_R2_BASE_URL=https://pub-5f5af9bd433747e5bee00f6003bc4d76.r2.dev
 */

/**
 * Build full CDN URL from path
 * @param {string} path - Full path including category (e.g., "Match/rugby-image.jpg")
 * @returns {string} Full CDN URL
 */
export const cdn = (path) => {
    const baseUrl = import.meta.env.VITE_R2_BASE_URL || "";
    if (!baseUrl) return path;
    // Remove leading slash from path for R2
    const cleanPath = path.startsWith("/") ? path.substring(1) : path;
    return `${baseUrl}/${cleanPath}`;
};

/**
 * Build R2 image URL by category and filename
 * @param {string} category - Gallery category (Match, Players, Team, Training, Community)
 * @param {string} filename - Image filename from manifest.json
 * @returns {string} Full CDN URL
 *
 * @example
 * buildR2ImageUrl("Community", "rugby-community_7541.jpg")
 * // Returns: "https://pub-5f5af9bd433747e5bee00f6003bc4d76.r2.dev/Community/rugby-community_7541.jpg"
 */
export const buildR2ImageUrl = (category, filename) => {
    const baseUrl = import.meta.env.VITE_R2_BASE_URL || "";
    if (!baseUrl) return `/${category}/${filename}`;
    return `${baseUrl}/${category}/${filename}`;
};

/**
 * Get gallery image URL from manifest reference
 * Convenience wrapper for buildR2ImageUrl
 * @param {string} category - Gallery category
 * @param {string} filename - Image filename from manifest.json
 * @returns {string} Full CDN URL
 *
 * @example
 * getGalleryImage("Match", "rugby-woman-team-zagreb-match_7503.jpg")
 */
export const getGalleryImage = (category, filename) => {
    return buildR2ImageUrl(category, filename);
};
