import { User } from "./api.interface";

export type AuthContextType = {
  accessToken: string;
  refreshToken: string;
  user: User | null;
  login: (email: string, password: string) => void;
  logout: () => void;
};
