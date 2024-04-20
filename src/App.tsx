import { Route, Routes } from "react-router-dom";
import Search from "./pages/Search";
import Results from "./pages/Results";
import Layout from "./components/layout/Layout";
import Login from "./pages/Login";
import AddEdit from "./pages/AddEdit";
import ProtectedRoute from "./components/protectedRoutes/ProtectedRoute";
import AuthProvider from "./context/AuthProvider";
import ProtectedAdminRoute from "./components/protectedRoutes/ProtectedAdminRoute";
import ProtectedEditorRoute from "./components/protectedRoutes/ProtectedEditorRoute";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Search />} />
          <Route path="/decretos" element={<Results />} />
          <Route path="/login" element={<Login />} />
          <Route path="form" element={<ProtectedRoute />}>
            <Route element={<ProtectedAdminRoute />}>
              <Route path="nuevo" element={<AddEdit isNew={true} />} />
            </Route>
            <Route element={<ProtectedEditorRoute />}>
              <Route path="edit" element={<AddEdit isNew={false} />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </AuthProvider>
  );
};

export default App;
