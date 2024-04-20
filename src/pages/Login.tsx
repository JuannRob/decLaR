import { LockOutlined } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { Navigate } from "react-router-dom";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const { login, user } = useAuth();
  const handleLogin = async () => {
    try {
      setError(false);
      await login(email, password);
    } catch (err) {
      setError(true);
    }
  };

  if (user !== null) return <Navigate to="/" />;
  return (
    <>
      <Container maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "#252d35" }}>
            <LockOutlined />
          </Avatar>
          <Box sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Dirección de correo"
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
              label="Contraseña"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />

            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, backgroundColor: "#252d35" }}
              onClick={handleLogin}
            >
              Login
            </Button>
            {error && (
              <p className="text-center text-red-500">
                Email o contraseña incorrecta
              </p>
            )}
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Login;
