import { Route, Routes } from "react-router-dom";
import Search from "./pages/Search";
import Results from "./pages/Results";
import Layout from "./components/layout/Layout";
import Login from "./pages/Login";
import { useState } from "react";
import { User } from "./ts/api.interface";

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState("");

  return (
    <Routes>
      <Route element={<Layout user={user} token={token} />}>
        <Route path="/" element={<Search />} />
        <Route path="/decretos" element={<Results />} />
      </Route>
      <Route
        path="/login"
        element={<Login setUser={setUser} setToken={setToken} />}
      />
    </Routes>
  );
};

export default App;
