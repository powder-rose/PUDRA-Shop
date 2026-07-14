export const request = async (url, method = "GET", body) => {
  try {
    const res = await fetch(url, {
      method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    const data = await res.json();

    if (!res.ok) {
      return {
        error: data.message || "Ошибка запроса",
      };
    }

    return {
      data,
    };
  } catch (error) {
    return {
      error: error.message,
    };
  }
};
