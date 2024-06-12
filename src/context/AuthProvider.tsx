import React, { useContext, createContext, useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import { config } from "../config/config";
import { User } from "../ts/api.interface";
import { getUser } from "../helpers/axios";

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => void;
  logout: () => void;
};

const BASE_URL = `${config.api.url}/user`;

const initialContext = {
  user: null,
  login: () => {},
  logout: () => {},
};

const AuthContext = createContext<AuthContextType>(initialContext);

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (localStorage.getItem("accessToken") && user === null) {
      getUser().then((user) => {
        setUser(user);
      });
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const res: AxiosResponse = await axios.post(
        `${BASE_URL}/login`,
        { email: email, password: password },
        { withCredentials: true },
      );

      if (res.data) {
        const newAccessToken = res.headers["authorization"] || "";
        localStorage.setItem("accessToken", newAccessToken);
        setUser(res.data.user);
      }

      throw new Error(res.statusText);
    } catch (err) {
      const error = err as Error;
      throw new Error(error.message);
    }
  };

  const logout = async () => {
    try {
      await axios.get(`${BASE_URL}/logout`);
      localStorage.removeItem("accessToken");
      setUser(null);
    } catch (err) {
      const error = err as Error;
      throw new Error(error.message);
    }
    return;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
