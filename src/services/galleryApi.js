const axios = require('axios');
const BAZE_URL = 'https://pixabay.com';
const API_KEY = '25658613-98e642d2c9015137af6c2464f';

axios.defaults.baseURL = BAZE_URL;

export default class GalleryApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.per_page = 12;
  }
  async fetchGallery() {
    const url = await axios.get('/api/', {
      params: {
        key: API_KEY,
        q: this.searchQuery,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: ' true',
        per_page: this.per_page,
        page: this.page,
      },
    });
    const { data } = url;
    if (!data.hits.length) {
      throw new Error(data.hits.status);
    }
    this.incrementPage();
    return data;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQueery) {
    this.searchQuery = newQueery;
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }
}
