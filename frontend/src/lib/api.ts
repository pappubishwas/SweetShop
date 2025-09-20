import axios from "axios";

// Load the API URL
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { "Content-Type": "application/json" }
});

// Set Token to the API headers
export function setToken(token?: string) {
  if (token) API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  else delete API.defaults.headers.common["Authorization"];
}

export default API;
