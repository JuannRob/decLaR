import axios, { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { User } from "../ts/api.interface";
import Cookies from "js-cookie";

const BASE_URL: string = import.meta.env.VITE_API_URL;

export function useAuth(email: string, password: string) {
  const [user, setUser] = useState<User | null>(null);
  const [userToken, setUserToken] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<AxiosError | null>(null);

  useEffect(() => {
    const login = async (): Promise<void> => {
      setIsLoading(true);
      try {
        const response: AxiosResponse = await axios.post(
          `${BASE_URL}/user/login`,
          { email: email, password: password },
          { withCredentials: true },
        );
        const tokenFromCookie = Cookies.get(response.data.User._id);
        setUser(response.data.User);
        setUserToken(tokenFromCookie || "");
      } catch (err) {
        setError(err as AxiosError);
      } finally {
        setIsLoading(false);
      }
    };

    login();
  }, []);

  return { user, userToken, isLoading, error };
}
