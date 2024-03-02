import React, { ChangeEvent } from "react";
import "./AdvSearchBar.css";
import { reduceFilters } from "../../data/filters";
import { InputData } from "../../ts/Search.interface";
import { Dispatcher } from "../../ts/state.type";

interface Props {
  index: number;
  currentInput: InputData;
  advInputs: InputData[];
  setAdvInputs: Dispatcher<InputData[]>;
}

const AdvSearchBar: React.FC<Props> = ({
  index,
  currentInput,
  advInputs,
  setAdvInputs,
}) => {
  const filters = reduceFilters(["num", "anho"]);

  const handleParamChange = (i: number, e: ChangeEvent<HTMLSelectElement>) => {
    const newInputs = [...advInputs];
    newInputs[i].fieldName = e.target.value;
    newInputs[i].isDisabled = false;
    setAdvInputs(newInputs);
  };

  const handleValueChange = (i: number, e: ChangeEvent<HTMLInputElement>) => {
    const newInputs = [...advInputs];
    newInputs[i].inputValue = e.target.value;
    setAdvInputs(newInputs);
  };

  return (
    <div className="inputBox">
      <input
        type="text"
        form="searchForm"
        name={currentInput.fieldName}
        value={currentInput.inputValue}
        onChange={(e) => handleValueChange(index, e)}
        disabled={currentInput.isDisabled}
      />
      <select
        value={currentInput.fieldName}
        onChange={(e) => handleParamChange(index, e)}
      >
        <option value="" disabled hidden>
          Otros filtros
        </option>
        {filters.map((filter, i) => (
          <option key={i} value={filter.slug}>
            {filter.title}
          </option>
        ))}
      </select>
    </div>
  );
};

export default AdvSearchBar;
