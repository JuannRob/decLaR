export interface IFilter {
  slug: string;
  title: string;
}

export const filters: IFilter[] = [
  { slug: "num", title: "Número" },
  { slug: "anho", title: "Año" },
  { slug: "fecha_pub", title: "Fecha de publicación" },
  { slug: "firma", title: "Gobernador" },
  { slug: "otros_firman", title: "Otros firmantes" },
  { slug: "num_ed_pub", title: "N° Ed. Pub." },
  { slug: "pag_pub", title: "Pág. Pub." },
  { slug: "anho_tomo", title: "Año del Tomo" },
  { slug: "nro_tomo", title: "N° del Tomo" },
  { slug: "anexo", title: "Anexo" },
  { slug: "ley_promul", title: "Ley promulgada" },
  { slug: "ley_vetada", title: "Ley vetada" },
  { slug: "parte_vetada", title: "Parte Vetada" },
  { slug: "ratif_x_ley", title: "Ratif. por ley" },
  { slug: "dnu", title: "DNU" },
  { slug: "reglamenta_ley", title: "Reglamenta ley" },
  { slug: "tema", title: "Tema" },
  { slug: "titulo", title: "Título" },
  { slug: "estado", title: "Estado" },
  { slug: "modif_por", title: "Modificada por" },
  { slug: "modif_a", title: "Modifica a" },
  { slug: "modif_por_ley", title: "Modificada por Ley" },
  { slug: "modif_a_ley", title: "Modifica a Ley" },
  { slug: "ref_norm", title: "Ref. normativas" },
  { slug: "fecha_carga", title: "Fecha Carga" },
  { slug: "deroga_dec", title: "Deroga decreto" },
  { slug: "derogado_por", title: "Derogada por" },
  { slug: "pendiente", title: "Pendiente" },
];

export const reduceFilters = (slugNames: string[]): IFilter[] => {
  const reducedList = filters.filter((f) => !slugNames.includes(f.slug));
  return reducedList;
};
