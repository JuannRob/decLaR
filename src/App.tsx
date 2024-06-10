import { Route, Routes } from "react-router-dom";
import Search from "./pages/Search";
import Results from "./pages/Results";
import Layout from "./components/layout/Layout";
import Login from "./pages/Login";
import CreateDec from "./pages/CreateDec";
import EditDec from "./pages/EditDec";
import ProtectedRoute from "./components/protectedRoutes/ProtectedRoute";
import AuthProvider from "./context/AuthProvider";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Search />} />
          <Route path="/login" element={<Login />} />
          <Route path="/decretos" element={<Results />} />
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute roles={["admin"]} />}>
            <Route path="/nuevo" element={<CreateDec />} />
          </Route>
          <Route element={<ProtectedRoute roles={["admin", "editor"]} />}>
            <Route path="/edit" element={<EditDec />} />
          </Route>
        </Route>
      </Routes>
    </AuthProvider>
  );
};

export default App;
