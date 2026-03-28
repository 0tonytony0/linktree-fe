import customFetch from "./customFetch";

export const login = async (username, password) => {
  console.log(username, password);
  return customFetch("auth/login", {
    method: "POST",
    headers: {
      // Wrap headers in proper object
      "Content-Type": "application/json",
    },
    body: { username, password },
  }).then((data) => {
    // Get token from the response structure correctly
    const token = data.data?.data?.token || data.data?.token || data.token;
    if (token) {
      localStorage.setItem("token", token);
    }
    return data;
  });
};

export const register = async (formData) => {
  return customFetch("auth/register", {
    method: "POST",
    body: formData, // Remove JSON.stringify()
  }).then((data) => {
    console.log({ data });
    localStorage.setItem("token", data.token);
    return data;
  });
};

export const updateUser = async (userData) => {
  return customFetch("auth", {
    method: "PUT",
    body: userData, // Remove JSON.stringify()
  }).then((data) => {
    return data;
  });
};

export const logout = () => {
  localStorage.removeItem("token");
};
