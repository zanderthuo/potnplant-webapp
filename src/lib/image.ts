export const getImageUrl = (image?: string | null) => {
  if (!image) return "/placeholder.png";

  if (image.startsWith("http")) return image;

  const apiUrl = "https://apiv1.potnplant.co.ke";

  return `${apiUrl}${image.startsWith("/") ? image : `/${image}`}`;
};