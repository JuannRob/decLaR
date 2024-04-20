import React, { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios, { AxiosResponse } from "axios";
import { config } from "../config/config";
import { AuthContextType } from "../ts/auth.interface";
import { User } from "../ts/api.interface";

const BASE_URL = `${config.api.url}/user`;

const initialContext = {
  user: null,
  accessToken: "",
  refreshToken: "",
  login: () => {},
  logout: () => {},
};
const AuthContext = createContext<AuthContextType>(initialContext);

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken") || "",
  );
  const [refreshToken, setRefreshToken] = useState(
    localStorage.getItem("refreshToken") || "",
  );
  const navigate = useNavigate();

  const login = async (email: string, password: string) => {
    try {
      const res: AxiosResponse = await axios.post(
        `${BASE_URL}/login`,
        { email: email, password: password },
        { withCredentials: true },
      );

      if (res.data) {
        const newAccessToken = res.headers["authorization"] || "";
        const newRefreshToken = Cookies.get("refreshToken") || "";
        localStorage.setItem("accessToken", newAccessToken);
        setUser(res.data.user);
        setAccessToken(newAccessToken);
        setRefreshToken(newRefreshToken);
        navigate(-2);
        return;
      }
      throw new Error(res.statusText);
    } catch (err) {
      throw new Error("Authentication failed");
    }
  };

  const logout = () => {
    setUser(null);
    setAccessToken("");
    setRefreshToken("");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    navigate("/");
    return;
  };

  return (
    <AuthContext.Provider
      value={{ user, accessToken, refreshToken, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
