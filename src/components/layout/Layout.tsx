import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { User } from "../../ts/api.interface";

interface Props {
  user: User | null;
  token: string;
}

const Layout: React.FC<Props> = ({ user, token }) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header user={user} token={token} />
      <div className="container flex w-3/4 xl:w-3/5 flex-grow flex-col items-center justify-center self-center relative">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
