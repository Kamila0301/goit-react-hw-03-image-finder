import axios from 'axios';

const API_KEY = '14666416-80cfd455e5c85d3a2f8572fbd';
axios.defaults.baseURL = `https://pixabay.com/api/`;

export const fetchItems = async (query, page) => {
  const divided = query.split('/');
  const dividedQuery = divided[1];

  try {
    const response = await axios.get('', {
      params: {
        key: API_KEY,
        q: dividedQuery,
        image_type: 'photo',
        orientation: 'horizontal',
        page: page,
        per_page: 12,
      },
    });
    return response.data.hits;
  } catch (error) {
    throw error;
  }
};
