import axios from 'axios';

const baseURL = 'https://pokeapi.co/api/v2/';

const ApiClient = axios.create({
  baseURL: baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export { ApiClient };