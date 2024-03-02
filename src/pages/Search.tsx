import React, { useState } from "react";
import { IconButton, Collapse } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import AdvSearchBar from "../components/search-bar/AdvSearchBar";
import { InputData } from "../ts/Search.interface";

export interface FormFields {
  [key: string]: FormDataEntryValue;
}

const Search: React.FC = () => {
  const initialInputs: InputData[] = [
    { fieldName: "", inputValue: "", isDisabled: true },
    { fieldName: "", inputValue: "", isDisabled: true },
    { fieldName: "", inputValue: "", isDisabled: true },
    { fieldName: "", inputValue: "", isDisabled: true },
  ];

  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);
  const [advInputs, setAdvInputs] = useState<InputData[]>(initialInputs);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new window.FormData(e.target as HTMLFormElement);
    const filteredFormData = new FormData();

    for (const [key, value] of formData) {
      if (value !== "" && !(value instanceof File)) {
        filteredFormData.append(key, value);
      }
    }
    const fields: FormFields = Object.fromEntries(filteredFormData);
    navigate("/decretos", { state: fields });
  };

  return (
    <div className="wrapper w-full bg-main-color p-5 my-11 xl:my-0">
      <div className="w-full p-2">
        <h1 className="text-center text-2xl">
          Buscador de Decretos de la Función Ejecutiva de La Rioja
        </h1>
        <p className="text-md text-center">
          publicados en el Boletín Oficial (Período 2011-2015)
        </p>
      </div>
      <form
        id="searchForm"
        className="form p-3 flex items-center [&>.text]:w-1/2 gap-3 py-5"
        onSubmit={handleSubmit}
      >
        <input
          id="num-search"
          name="num"
          className="styledInput"
          placeholder="341 o :23"
        />
        <input
          id="year-search"
          name="anho"
          className="styledInput"
          placeholder="2011"
        />
        <IconButton
          type="submit"
          aria-label="search"
          sx={{ border: "1px solid white", borderRadius: 2, padding: 0.5 }}
        >
          <SearchIcon sx={{ color: "white", fontSize: 35, margin: 0 }} />
        </IconButton>
      </form>
      <div className="flex justify-end items-center">
        <span>Búsqueda avanzada</span>
        <IconButton
          size="large"
          edge="end"
          aria-label="expand"
          onClick={() => setExpanded((prevExpanded) => !prevExpanded)}
          sx={{ color: "white" }}
        >
          {expanded ? <ExpandMoreIcon /> : <ExpandLessIcon />}
        </IconButton>
      </div>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <div className="p-3 w-full m-auto text-white gap-4 grid grid-cols-2">
          {advInputs.map((currentInput, i) => (
            <AdvSearchBar
              key={i}
              index={i}
              currentInput={currentInput}
              advInputs={advInputs}
              setAdvInputs={setAdvInputs}
            />
          ))}
        </div>
      </Collapse>
    </div>
  );
};

export default Search;
