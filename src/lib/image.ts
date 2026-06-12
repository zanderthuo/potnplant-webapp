export const getImageUrl = (image?: string | null) => {
  if (!image) {
    return "/placeholder.png";
  }

  if (image.startsWith("http")) {
    return image;
  }

const apiUrl = "http://localhost:3000"; // Replace with your actual backend API URL
  return `${apiUrl}${image}`;
};