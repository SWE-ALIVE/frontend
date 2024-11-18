import axios from "axios";

const BASE_URL = "";

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 20000,
});

const sendbird_instance = axios.create({
  baseURL: `${BASE_URL}/api/sendbird/`,
  timeout: 20000,
});

export { instance, sendbird_instance };
