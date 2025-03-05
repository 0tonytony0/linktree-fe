import customFetch from "./customFetch";

export const login = async (username, password) => {
  return customFetch("auth/login", {
    method: "POST",
    body: { username, password },
  }).then((data) => {
    localStorage.setItem("token", data.token);
    return data;
  });
};

export const register = async (formData) => {
  return customFetch("auth/register", {
    method: "POST",
    body: formData,
  }).then((data) => {
    localStorage.setItem("token", data.token);
    return data;
  });
};

export const logout = () => {
  localStorage.removeItem("token");
};
