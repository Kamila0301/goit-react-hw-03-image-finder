import axios from 'axios';

const API_KEY = '14666416-80cfd455e5c85d3a2f8572fbd';
const BASE_URL = `https://pixabay.com/api/`;

export async function fetchItems({ query, page }) {
  const params = new URLSearchParams({
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    page: page,
    per_page: 12,
  });
  try {
    const response = await axios.get(`${BASE_URL}?${params}`);
    return response.data;
  } catch (error) {
    return [];
  }
}
