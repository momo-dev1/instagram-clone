export const handleImageUpload = async (imageFile) => {
  const formData = new FormData();
  formData.append("file", imageFile);
  formData.append("upload_preset", "insta-images");
  formData.append("cloud_name", "dcmj9dpef");

  const res = await fetch(
    "https://api.cloudinary.com/v1_1/dcmj9dpef/image/upload",
    {
      method: "POST",
      Accept: "application/json",
      body: formData,
    }
  );
  const imageUrl = await res.json();
  return imageUrl.url;
};
