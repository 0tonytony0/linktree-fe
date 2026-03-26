const API_URL = import.meta.env.VITE_API_URL;

const customFetch = async (
  endpoint,
  { method = "GET", body, token } = {},
  isformData = false
) => {
  const headers = isformData ? {} : { "Content-Type": "application/json" };
  const authToken = token || localStorage.getItem("token");

  if (authToken) {
    headers.Authorization = `Bearer ${authToken}`;
  }

  let reqBody = body;

  console.log({ body });

  if (!isformData) {
    console.log({ isformData });
    reqBody = body ? JSON.stringify(body) : undefined;
    console.log({ reqBody });
  }

  //   const response = await fetch(`${API_URL}/${endpoint}`, {
  //     method,
  //     headers,
  //     body: reqBody,
  //   });

  //   const data = await response.json();
  //   if (!response.ok) {
  //     throw new Error(data.message || "Request failed");
  //   }

  //   return data;
  // };

  try {
    const response = await fetch(`${API_URL}/${endpoint}`, {
      method,
      headers,
      body: reqBody,
    });

    const data = await response.json();

    return {
      success: response.ok,
      status: response.status,
      data,
    };
  } catch (err) {
    console.error("Fetch error:", err);
    return {
      success: false,
      status: 500,
      data: { message: err.message },
    };
  }
};

export default customFetch;
