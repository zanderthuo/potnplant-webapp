import { api } from "../../../api/api";

export type LoginPayload = {
  email: string;
  password: string;
};

export type LoginResponse = {
  accessToken: string;
  user: {
    id: string;
    fullName: string;
    email: string;
    role: string;
  };
};

export async function login(payload: LoginPayload) {
  const response = await api.post<LoginResponse>(
    "/admin/auth/login",
    payload
  );

  return response.data;
}