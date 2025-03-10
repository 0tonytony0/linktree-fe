import customFetch from "./customFetch";

export const uploadImage = async (file) => {
  const formData = new FormData();
  console.log({ file });
  formData.append("image", file);
  console.log({ formData });
  return customFetch(
    "upload",
    {
      method: "POST",
      body: formData,
    },
    true
  );
};
