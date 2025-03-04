const API_URL = `${import.meta.env.VITE_API_URL}/auth`;

export const login = async (username, password) => {
  try {
    console.log({ url: API_URL });
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
      //   credentials: "include", // Include cookies for authentication
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Login failed");
    }

    // 🔹 Store JWT Token in Local Storage
    localStorage.setItem("token", data.token);

    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const register = async (formData) => {
  try {
    const response = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        f_name: formData.firstName,
        l_name: formData.lastName,
        email: formData.email,
        password: formData.password,
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Registration failed");
    }

    return data;
  } catch (error) {
    throw new Error("Something went wrong. Please try again.");
  }
};
