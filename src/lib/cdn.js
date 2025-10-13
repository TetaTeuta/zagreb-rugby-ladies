export const cdn = (path) => {
    const baseUrl = import.meta.env.VITE_R2_BASE_URL || "";
    if (!baseUrl) return path;
    return `${baseUrl}${path.startsWith("/") ? "" : "/"}${path}`;
};
