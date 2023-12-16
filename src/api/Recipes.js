const apiKey = import.meta.env.VITE_RECIPIE_API_KEY;

export const getPopular = async () => {
  const api = await fetch();
  const data = api.json();
  return data;
};
