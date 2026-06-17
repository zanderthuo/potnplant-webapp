export const getImageUrl = (image?: string | null) => {
  if (!image) {
    return "/placeholder.png";
  }

  if (image.startsWith("http")) {
    return image;
  }

const apiUrl = import.meta.env.VITE_API_BASE_URL; // Replace with your actual backend API URL
  return `${apiUrl}${image}`;
};