import axios from "axios";
import { API_URL } from "./apiUrl";
// export const sandboxInstance = axios.create({
//   baseURL: process.env.REACT_APP_SANDBOX_URL
// })

const instance = axios.create({
  baseURL: API_URL.API_HOST
});

export default instance;
