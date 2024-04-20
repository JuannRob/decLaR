import React, { useState } from "react";
import { Decree } from "../ts/api.interface";

interface Props {
  isNew: boolean;
}

const initialDecreeState: Decree = {
  _id: "",
  num: "",
  anho: "",
  fecha: new Date(),
  fecha_pub: new Date(),
  cant_arts: "",
  firma: "",
  otros_firman: [],
  pub: "",
  num_ed_pub: "",
  pag_pub: "",
  anho_tomo: "",
  nro_tomo: "",
  anexo: "",
  ley_promul: "",
  ley_vetada: "",
  parte_vetada: "",
  ratif_x_ley: "",
  dnu: "",
  art_126_12: false,
  reglamenta_ley: "",
  tema: "",
  titulo: "",
  estado: "",
  modif_por: "",
  modif_a: "",
  modif_por_ley: "",
  modif_a_ley: "",
  link_pub: "",
  ref_norm: "",
  obs: "",
  fecha_carga: new Date(),
  tipeo_dictado: "",
  deroga_dec: "",
  derogado_por: "",
  pendiente: "",
  obs_tomo: "",
  claves: "",
  __v: 0,
};

const AddEdit: React.FC<Props> = ({ isNew }) => {
  const [decree, setDecree] = useState<Decree>(initialDecreeState);

  const pathName = window.location.pathname;
  if (pathName.includes("nuevo")) console.log("Nuevo");
  else if (pathName.includes("edit")) console.log("Editor");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setDecree({ ...decree, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDecree(initialDecreeState);
  };

  return (
    <>
      <h2 className="text-black">
        {isNew ? "Nuevo Decreto" : "Editar Decreto"}
      </h2>
      <form onSubmit={handleSubmit} className="text-black">
        <label>
          Número:
          <input
            type="text"
            name="num"
            value={decree.num}
            onChange={handleChange}
          />
        </label>
        <label>
          Año:
          <input
            type="text"
            name="anho"
            value={decree.anho}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Crear Decreto</button>
      </form>
      <p className="text-black">{decree.num}</p>
      <p className="text-black">{decree.anho}</p>
    </>
  );
};

export default AddEdit;
