export const TAB_LINKS = {
  LINKS: "links",
  APPEARANCE: "appearance",
  ANALYTICS: "analytics",
  SETTINGS: "settings",
};

export const isAuthenticated = () => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    return token ? token : null;
  }
  return null;
};

export const logout = (navigate) => {
  if (typeof window !== "undefined") {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/");
  }
};
