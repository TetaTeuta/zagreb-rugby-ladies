export const cdn = (path) => {
    const baseUrl = import.meta.env.VITE_R2_BASE_URL || "";
    if (!baseUrl) return path;
    // Remove leading slash from path for R2
    const cleanPath = path.startsWith("/") ? path.substring(1) : path;
    return `${baseUrl}/${cleanPath}`;
};

// Helper to build R2 image URLs by category
export const buildR2ImageUrl = (category, filename) => {
    const baseUrl = import.meta.env.VITE_R2_BASE_URL || "";
    if (!baseUrl) return `/${category}/${filename}`;
    return `${baseUrl}/${category}/${filename}`;
};
