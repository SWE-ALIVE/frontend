import { loginApi, UserResponse, LoginRequest } from "@/service/auth.service";
import { useMutation } from "@tanstack/react-query";

export const useLogin = () => {
  return useMutation<UserResponse[], Error, LoginRequest>({
    mutationKey: ["login"],
    mutationFn: loginApi,
  });
};
