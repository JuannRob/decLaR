import React, { useEffect } from "react";
import { Snackbar } from "@mui/material";
import { Dispatcher } from "../ts/state.type";

interface Props {
  isLoading: boolean;
  showAlert: boolean;
  setShowAlert: Dispatcher<boolean>;
}

const Alert: React.FC<Props> = ({ isLoading, showAlert, setShowAlert }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (isLoading) {
        setShowAlert(true);
      }
    }, 5000);
    return () => clearTimeout(timeout);
  }, [isLoading]);

  const alertMessageNode: React.ReactNode = (
    <div className="text-base">
      <i>[Versión de prueba]</i> <br /> El buscador estuvo inactivo por un
      tiempo prolongado.
      <br />
      Por favor, aguarde mientras se restablece la base de datos.
    </div>
  );

  return (
    <Snackbar
      open={showAlert}
      onClose={() => setShowAlert(false)}
      autoHideDuration={10000}
      message={alertMessageNode}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      sx={{
        marginBottom: 10,
      }}
    />
  );
};

export default Alert;
