const API_URL = import.meta.env.VITE_API_URL;

const customFetch = async (endpoint, { method = "GET", body, token } = {}) => {
  const headers = { "Content-Type": "application/json" };
  const authToken = token || localStorage.getItem("token");

  if (authToken) {
    headers.Authorization = `Bearer ${authToken}`;
  }

  const response = await fetch(`${API_URL}/${endpoint}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Request failed");
  }

  return data;
};

export default customFetch;
