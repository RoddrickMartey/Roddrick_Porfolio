export async function uploadImage(file) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "rodco_business_hub");

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/dd4bv2upq/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await res.json();
  return data.secure_url; // Return only the image URL
}
