import customFetch from "./customFetch";

export const getProfile = async () => {
  return customFetch(`profile`);
};

export const createProfile = async (profileData) => {
  return customFetch("profile", {
    method: "POST",
    body: profileData,
  });
};

export const updateProfile = async (profileId, updateData) => {
  return customFetch(`profile/${profileId}`, {
    method: "PUT",
    body: updateData,
  });
};
