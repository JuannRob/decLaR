import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import Row from "./Row";
import PaginationBar from "./PaginationBar";
import { Data } from "../../ts/api.interface";
import { Options } from "../../ts/Search.interface";
import { Dispatcher } from "../../ts/state.type";

interface Props {
  data: Data;
  options: Options;
  setOptions: Dispatcher<Options>;
}

const CollapsibleTable: React.FC<Props> = ({ data, options, setOptions }) => {
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: "10%" }} />
              <TableCell align="center" sx={{ width: "10%" }}>
                Decreto
              </TableCell>
              <TableCell align="center" sx={{ width: "15%" }}>
                Firma
              </TableCell>
              <TableCell align="center" sx={{ width: "65%" }}>
                Tema
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.docs.map((decree) => (
              <Row key={decree._id} decree={decree} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <PaginationBar
        totalDocs={data.totalDocs}
        options={options}
        setOptions={setOptions}
      />
    </>
  );
};
export default CollapsibleTable;
