// src/api.ts

const API_BASE = import.meta.env.VITE_API_URL;

export const fetchSomething = async () => {
  try {
    const response = await fetch(`${API_BASE}/api/something`);
    if (!response.ok) throw new Error('Request failed');
    return await response.json();
  } catch (err) {
    console.error('API fetch error:', err);
    return null;
  }
};
