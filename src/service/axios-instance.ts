import axios from "axios";

const BASE_URL = "";

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 20000,
});

export { instance };
