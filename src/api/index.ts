import axios from 'axios';

console.log(import.meta)
const $axios = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export default $axios;
