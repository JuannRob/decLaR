import { Route, Routes } from "react-router-dom";
import Search from "./pages/Search";
import Results from "./pages/Results";
import NewDecree from "./pages/NewDecree";
import Layout from "./components/layout/Layout";

const App: React.FC = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Search />} />
        <Route path="/decretos" element={<Results />} />
        <Route path="/decretos/nuevo" element={<NewDecree />} />
      </Route>
    </Routes>
  );
};

export default App;
