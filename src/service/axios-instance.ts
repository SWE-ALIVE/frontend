import axios from "axios";

const BASE_URL =
  "http://ec2-43-202-59-105.ap-northeast-2.compute.amazonaws.com";

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 20000,
});

const sendbird_instance = axios.create({
  baseURL: `${BASE_URL}/v1/sendbird`,
  timeout: 20000,
});

export { instance, sendbird_instance };
