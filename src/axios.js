import axios from 'axios';

export const Axios = axios.create({
  baseURL: 'https://api.praktyka.wirtuozikodu.pl/v1',
  headers: { 'X-Praktykant-Wk': 'WK' },
});
