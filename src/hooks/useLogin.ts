import { loginApi, LoginResponse, LoginRequest } from "@/service/auth.service";
import { useMutation } from "@tanstack/react-query";

export const useLogin = () => {
  return useMutation<LoginResponse, Error, LoginRequest>({
    mutationKey: ["login"],
    mutationFn: loginApi,
  });
};
