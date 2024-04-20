import { IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useLocation, useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import AddIcon from "@mui/icons-material/Add";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAuth } from "../../context/AuthProvider";

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isAtHome = location.pathname === "/";
  const isAtLogin = location.pathname === "/login";

  return (
    <header>
      <div className="w-100 bg-main-color p-4 h-24 flex items-center justify-between">
        <div className="w-2/12 flex justify-start gap-5">
          {!isAtHome && (
            <>
              <IconButton
                aria-label="navigate back"
                size="medium"
                color="primary"
                type="button"
                onClick={() => navigate(-1)}
              >
                <ArrowBackIcon
                  fontSize="inherit"
                  sx={{ color: "white", fontSize: 40 }}
                />
              </IconButton>
              <IconButton
                aria-label="navigate back"
                size="medium"
                color="primary"
                type="button"
                onClick={() => navigate("/")}
              >
                <HomeIcon
                  fontSize="inherit"
                  sx={{ color: "white", fontSize: 40 }}
                />
              </IconButton>
            </>
          )}
        </div>
        {user && (
          <div className="text-lg text-center">
            {`${user.name}`} <br /> {` [ ${user.role} ]`}
          </div>
        )}
        <div className="w-2/12 flex justify-end gap-5">
          {!isAtLogin && (
            <>
              {user?.role === "admin" && (
                <IconButton
                  aria-label="navigate back"
                  size="medium"
                  color="primary"
                  type="button"
                  onClick={() => navigate("/form/nuevo")}
                >
                  <AddIcon
                    fontSize="inherit"
                    sx={{ color: "white", fontSize: 40 }}
                  />
                </IconButton>
              )}
              {user ? (
                <IconButton
                  aria-label="navigate back"
                  size="medium"
                  color="primary"
                  type="button"
                  onClick={() => logout()}
                >
                  <LogoutIcon
                    fontSize="inherit"
                    sx={{ color: "white", fontSize: 40 }}
                  />
                </IconButton>
              ) : (
                <IconButton
                  aria-label="navigate back"
                  size="medium"
                  color="primary"
                  type="button"
                  onClick={() => navigate("/login")}
                >
                  <LoginIcon
                    fontSize="inherit"
                    sx={{ color: "white", fontSize: 40 }}
                  />
                </IconButton>
              )}
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
