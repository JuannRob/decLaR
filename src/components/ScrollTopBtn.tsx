import { North } from "@mui/icons-material";
import { Button } from "@mui/material";
import React, { useState } from "react";

const ScrollTopBtn: React.FC = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 1000) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };
  window.addEventListener("scroll", toggleVisible);

  return (
    <div
      className={`fixed z-1 bottom-24 left-28 cursor-pointer ${visible ? "block" : "hidden"}`}
    >
      <Button
        sx={{
          "& .MuiButton-contained.MuiButton-colorPrimary": {
            color: "red",
          },
        }}
        variant="contained"
        endIcon={<North />}
        onClick={() => {
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }}
      >
        Ir arriba
      </Button>
    </div>
  );
};

export default ScrollTopBtn;
