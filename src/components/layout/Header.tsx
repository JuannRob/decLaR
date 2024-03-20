import { IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useLocation, useNavigate } from "react-router-dom";
import { User } from "../../ts/api.interface";

interface Props {
  user: User | null;
  token: string;
}

const Header: React.FC<Props> = ({ user, token }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isAtHome = location.pathname === "/";
  const isLogged = user !== null;

  return (
    <header>
      <div className="w-100 bg-main-color p-4 h-24 flex items-center justify-between">
        <div>
          {!isAtHome && (
            <IconButton
              aria-label="navigate back"
              size="medium"
              color="primary"
              type="button"
              onClick={() => navigate("/")}
            >
              <ArrowBackIcon
                fontSize="inherit"
                sx={{ color: "white", fontSize: 40 }}
              />
            </IconButton>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
