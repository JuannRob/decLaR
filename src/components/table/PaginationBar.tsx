import React from "react";
import { Options } from "../../ts/Search.interface";
import { Dispatcher } from "../../ts/state.type";
import TablePagination from "@mui/material/TablePagination";

interface Props {
  options: Options;
  setOptions: Dispatcher<Options>;
  totalDocs: number;
}

const PaginationBar: React.FC<Props> = ({ options, setOptions, totalDocs }) => {
  const handleChange = (
    // eslint-disable-next-line
    // @ts-ignore
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setOptions({
      ...options,
      page: newPage + 1,
    });
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setOptions({
      ...options,
      limit: parseInt(event.target.value, 10),
      page: 1,
    });
  };

  return (
    <TablePagination
      sx={{
        "& .MuiTableCell": {
          color: "red",
          borderColor: "red",
        },
        "& .MuiTablePagination-toolbar": {
          marginTop: 2,
          backgroundColor: "",
          color: "white",
        },
        "& .MuiTablePagination-selectIcon": {
          color: "white",
        },
        "& .MuiTablePagination-menuItem": {
          backgroundColor: "yellow",
        },
        "& .Mui-disabled": {
          color: "#757575",
        },
      }}
      page={options.page - 1}
      count={totalDocs}
      onPageChange={handleChange}
      rowsPerPage={options.limit}
      onRowsPerPageChange={handleChangeRowsPerPage}
      labelDisplayedRows={({ from, to, count }) => {
        return "" + from + " - " + to + " de " + count;
      }}
      labelRowsPerPage={"Decretos por página:"}
    />
  );
};

export default PaginationBar;
