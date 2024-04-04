import { IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useLocation, useNavigate } from "react-router-dom";
// import { Add } from "@mui/icons-material";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isAtHome = location.pathname === "/";

  return (
    <header>
      <div className="w-100 bg-main-color p-4 h-24 flex items-center justify-between">
        <div>
          {!isAtHome && (
            <>
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
            </>
          )}
        </div>
        {/* <div>
          {token && (
            <IconButton
              aria-label="navigate back"
              size="medium"
              color="primary"
              type="button"
              onClick={() => navigate("/")}
            >
              <Add fontSize="inherit" sx={{ color: "white", fontSize: 40 }} />
            </IconButton>
          )}
          {token ? "Salir" : <Link to={"/login"}> Ingresar</Link>}
        </div> */}
      </div>
    </header>
  );
};

export default Header;
