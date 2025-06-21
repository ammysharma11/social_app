export async function uploadToCloudinary(file) {
  const url = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD}/image/upload`;

  const form = new FormData();
  form.append('file', file);
  form.append('upload_preset', process.env.REACT_APP_CLOUDINARY_PRESET);

  const res = await fetch(url, { method: 'POST', body: form });
  if (!res.ok) throw new Error('Cloudinary upload failed');
  const data = await res.json();
  return data.secure_url;            // final https://res.cloudinary.com/… URL
}
