import customFetch from "./customFetch";

export const getProfile = async () => {
  return customFetch(`profile`);
};

export const getProfileFromId = async (profileId) => {
  return customFetch(`profile/${profileId}`);
};

export const createProfile = async (profileData) => {
  return customFetch("profile", {
    method: "POST",
    body: profileData,
  });
};

export const updateProfile = async (updateData) => {
  return customFetch(`profile`, {
    method: "PUT",
    body: updateData,
  });
};

export const updateLinkData = async (linkId, device, isLink) => {
  return customFetch(`profile/link/${linkId}`, {
    method: "PUT",
    body: { device, isLink },
  });
};

export const getAnalyticsData = async () => {
  return customFetch(`profile/analytics`, {
    method: "GET",
  });
};
