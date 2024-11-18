import { instance } from "./axios-instance";

export interface LoginRequest {
  phone_number: string;
  password: string;
}

export interface UserResponse {
  id: string;
  name: string;
  birth_date: string;
  phone_number: string;
}

export const loginApi = async (
  credentials: LoginRequest
): Promise<UserResponse[]> => {
  const response = await instance.post("/login", credentials);
  return response.data;
};
