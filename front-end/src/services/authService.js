import dotenv from 'dotenv';
dotenv.config();

const API_BASE_URL = process.env.API_BASE_URL;

export async function fetchLoginUser(formData) {
  const res = await fetch(`${API_BASE_URL}/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  const data = await res.json();
  if (!res.ok) {
    const msg =
      data.message ||
      (data.errors &&
        data.errors.map((e) => `${e.path}: ${e.msg}`).join("\n")) ||
      res.statusText;
    console.error("Login failed:", msg);
    throw new Error(msg);
  }

  return data;
}

export async function fetchSignupUser(formData) {
  const res = await fetch(`${API_BASE_URL}/users/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });
  const data = await res.json();
  if (!res.ok) {
    const msg =
      data.message ||
      (data.errors &&
        data.errors.map((e) => `${e.path}: ${e.msg}`).join("\n")) ||
      res.statusText;
    throw new Error(msg);
  }
  return data;
}
