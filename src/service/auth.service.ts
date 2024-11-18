import { instance } from "./axios-instance";

export interface LoginRequest {
  phone_number: string;
  password: string;
}

export interface LoginResponse {
  id: string;
  name: string;
  birth_date: string;
  phone_number: string;
}

export const loginApi = async (
  credentials: LoginRequest
): Promise<LoginResponse> => {
  const response = await instance.post("/login", credentials);
  return response.data;
};
