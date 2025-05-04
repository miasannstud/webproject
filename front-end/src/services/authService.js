const API_BASE_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:8080/api"
    : "https://group6.sustainability.it.ntnu.no/api";

export async function fetchLoginUser(formData) {
  try {
    const res = await fetch(`${API_BASE_URL}/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    if (!res.ok) {
      throw new Error(res.status);
    }
    return await res.json();
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
}

export async function fetchSignupUser(formData) {
  try {
    const res = await fetch(`${API_BASE_URL}/users/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    if (!res.ok) {
      throw new Error(res.status);
    }
    return await res.json();
  } catch (error) {
    console.error("Error signing up:", error);
    throw error;
  }
}
