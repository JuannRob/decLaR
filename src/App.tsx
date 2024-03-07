import { Route, Routes } from "react-router-dom";
import Search from "./pages/Search";
import Results from "./pages/Results";
import Layout from "./components/layout/Layout";

const App: React.FC = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Search />} />
        <Route path="/decretos" element={<Results />} />
      </Route>
    </Routes>
  );
};

export default App;
