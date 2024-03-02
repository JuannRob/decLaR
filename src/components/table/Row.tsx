import React from "react";
import {
  TableCell,
  TableRow,
  Collapse,
  Box,
  IconButton,
  Stack,
  Chip,
} from "@mui/material";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { Decree } from "../../ts/api.interface";

interface Props {
  decree: Decree;
}

const Row: React.FC<Props> = ({ decree }) => {
  const [open, setOpen] = React.useState(false);

  const fecha = new Date(decree.fecha);
  const fechaPub = new Date(decree.fecha_pub);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" }, height: 120 }}>
        <TableCell sx={{ width: "10%" }}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell
          component="th"
          scope="row"
          align="center"
          sx={{ verticalAlign: "top", width: "10%" }}
        >
          {decree.num}/{decree.anho}
        </TableCell>
        <TableCell align="center" sx={{ verticalAlign: "top", width: "15%" }}>
          {decree.firma}
        </TableCell>
        <TableCell align="left" sx={{ width: "65%", verticalAlign: "top" }}>
          {decree.tema}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1, padding: 1 }}>
              <ul>
                <li>
                  <b>Otras firmas:</b> {decree.otros_firman}
                </li>
                <li>
                  <b>Del</b> {fecha.toLocaleDateString()} - <b>Pub.</b>{" "}
                  {fechaPub.toLocaleDateString()}
                </li>
                <li>
                  <b>Num. Ed. Pub.:</b>
                  {decree.num_ed_pub}
                </li>
              </ul>

              <div className="my-3">
                {decree.modif_a && (
                  <p>
                    {" "}
                    Modificado a {decree.modif_a}. <br />{" "}
                  </p>
                )}
                {decree.modif_por && (
                  <p>
                    {" "}
                    Modificado por Dec. {decree.modif_por}. <br />{" "}
                  </p>
                )}
                {decree.ratif_x_ley && (
                  <p>
                    {" "}
                    Ratificado por Ley {decree.ratif_x_ley}. <br />{" "}
                  </p>
                )}
                {decree.anexo && (
                  <p>
                    {" "}
                    Anexo: {decree.anexo}. <br />{" "}
                  </p>
                )}
                {decree.ref_norm && (
                  <p>
                    {" "}
                    Referencias normativas: {decree.ref_norm}. <br />{" "}
                  </p>
                )}
              </div>

              <p>
                Nota de la SIT: <br />
              </p>
              <p className="ps-3">
                Boletin Oficial disponible en: <br />
                Biblioteca de la S.I.T.: Volumen {decree.anho_tomo}, tomo{" "}
                {decree.nro_tomo}, pág. {decree.pag_pub}
                <br />
                Versión digital en{" "}
                <a
                  href={decree.link_pub}
                  target="_blank"
                  rel="noreferrer"
                  className="underline py-1"
                >
                  Boletín Oficial de La Rioja
                </a>
              </p>

              <Stack direction="row" spacing={1} className="py-2">
                {decree.art_126_12 && (
                  <Chip label="Decreto de Necesidad y Urgencia" />
                )}
                {decree.ley_promul && decree.ley_vetada && (
                  <Chip label="De promulgación y veto parcial" />
                )}
                {decree.ley_promul && !decree.ley_vetada && (
                  <Chip label="De promulgación" />
                )}
                {!decree.parte_vetada && decree.ley_vetada && (
                  <Chip label="De veto" />
                )}
                {decree.reglamenta_ley && (
                  <Chip label="Decreto reglamentario" />
                )}
                {decree.derogado_por && <Chip label="DEROGADO" />}
                {decree.deroga_dec && <Chip label="De derogación" />}
              </Stack>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

export default Row;
