import axios from "axios";

// export const BASE_URL = 'https://starshine-project.ru';
export const BASE_URL = `${process.env.REACT_APP_BASEURL || 'https://sqr-backend.herokuapp.com'}`;
// export const BASE_URL = 'https://sqr-backend.herokuapp.com';

console.log("Using base API:", BASE_URL)

const baseAPI = axios.create({ baseURL: BASE_URL });

export default baseAPI;