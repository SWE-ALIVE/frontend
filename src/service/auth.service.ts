import axios from "axios";

const BASE_URL = "YOUR_API_BASE_URL"; // TODO: 실제 BASE URL로 변경

interface LoginRequest {
  phone_number: string;
  password: string;
}

interface UserResponse {
  id: string;
  name: string;
  birth_date: string;
  phone_number: string;
}

export const login = async (
  credentials: LoginRequest
): Promise<UserResponse[]> => {
  try {
    // const response = await axios.post(`${BASE_URL}/login`, credentials);
    // return response.data;

    // Server Connection 없이 local test용 예시 data
    // return [
    //   {
    //     id: "123",
    //     name: "John Doe",
    //     birth_date: "1990-01-01",
    //     phone_number: "010-1234-5678",
    //   },
    // ];

    // for testing failed login
    throw new Error("Login failed");
  } catch (error) {
    throw new Error("Login failed");
  }
};
