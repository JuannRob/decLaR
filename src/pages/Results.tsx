import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import CollapsibleTable from "../components/table/CollapsibleTable";
import { filters, IFilter } from "../data/filters";
import "./Results.css";
import {
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { ApiRequest, Options } from "../ts/Search.interface";
import ScrollTopBtn from "../components/ScrollTopBtn";
import Alert from "../components/Alert";

const Results: React.FC = () => {
  const initialOptions: Options = {
    limit: 10,
    page: 1,
    sortBy: "tema",
    order: -1,
  };

  const { state } = useLocation();
  const [checked, setChecked] = useState(false);
  const [options, setOptions] = useState<Options>(initialOptions);
  const [showAlert, setShowAlert] = useState<boolean>(false);

  // [options] is useFetch's dependency array
  const { data, isLoading, error } = useFetch(
    { ...state, ...options } as ApiRequest,
    [options],
  );

  if (error) {
    console.log(error);
  }

  const handleSelectChange = (e: SelectChangeEvent) => {
    const selectedValue: string = e.target.value;
    setOptions({
      ...options,
      sortBy: selectedValue,
      order: checked ? -1 : 1,
    });
  };

  const handleSwitch = () => {
    setChecked(!checked);
    setOptions({
      ...options,
      order: checked ? -1 : 1,
    });
  };

  return (
    <>
      {isLoading && <CircularProgress sx={{ color: "#252d35" }} />}
      <Alert
        isLoading={isLoading}
        showAlert={showAlert}
        setShowAlert={setShowAlert}
      />
      {data && (
        <div className="w-full flex my-11 xl:my-15">
          <div className="w-1/4 p-10 absolute -left-80">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Ordenar por</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Ordenar Por"
                onChange={(e: SelectChangeEvent) => handleSelectChange(e)}
                defaultValue={initialOptions.sortBy}
              >
                {filters.map((filter: IFilter, i: number) => (
                  <MenuItem key={i} value={filter.slug}>
                    {filter.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <div className="checkbox-wrapper-35">
              <input
                value="private"
                name="switch"
                id="switch"
                type="checkbox"
                className="switch"
                defaultChecked={checked}
                onClick={handleSwitch}
              />
              <label htmlFor="switch">
                <span className="switch-x-toggletext">
                  <span className="switch-x-unchecked">
                    <span className="switch-x-hiddenlabel">Unchecked: </span>
                    Descendente
                  </span>
                  <span className="switch-x-checked">
                    <span className="switch-x-hiddenlabel">Checked: </span>
                    Ascendente
                  </span>
                </span>
              </label>
            </div>
            <ScrollTopBtn />
          </div>
          <div className="wrapper w-full bg-main-color p-6 flex justify-center items-center flex-col">
            <CollapsibleTable
              data={data}
              options={options}
              setOptions={setOptions}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Results;
