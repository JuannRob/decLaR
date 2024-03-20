import { LockOutlined } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  TextField,
  Typography,
} from "@mui/material";
import axios, { AxiosResponse } from "axios";
import React, { useState } from "react";
import Cookies from "js-cookie";
import { Dispatcher } from "../ts/state.type";
import { User } from "../ts/api.interface";

const BASE_URL: string = import.meta.env.VITE_API_URL;

interface Props {
  setUser: Dispatcher<User | null>;
  setToken: Dispatcher<string>;
}

const Login: React.FC<Props> = ({ setToken, setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response: AxiosResponse = await axios.post(
        `${BASE_URL}/user/login`,
        { email: email, password: password },
        { withCredentials: true },
      );
      const tokenFromCookie = Cookies.get(response.data.User._id);
      setUser(response.data.User);
      setToken(tokenFromCookie || "");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Container maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            mt: 20,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.light" }}>
            <LockOutlined />
          </Avatar>
          <Typography variant="h5">Login</Typography>
          <Box sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="password"
              name="password"
              label="Password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />

            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleLogin}
            >
              Login
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Login;
