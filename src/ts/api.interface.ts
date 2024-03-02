export interface APIResponse {
  status: string;
  data: Data;
}

export interface Data {
  docs: Decree[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: null;
  nextPage: number;
}

export interface Decree {
  _id: string;
  num: string;
  anho: string;
  fecha: Date;
  fecha_pub: Date;
  cant_arts: string;
  firma: string;
  otros_firman: string[];
  pub: string;
  num_ed_pub: string;
  pag_pub: string;
  anho_tomo: string;
  nro_tomo: string;
  anexo: string;
  ley_promul: string;
  ley_vetada: string;
  parte_vetada: string;
  ratif_x_ley: string;
  dnu: string;
  art_126_12: boolean;
  reglamenta_ley: string;
  tema: string;
  titulo: string;
  estado: string;
  modif_por: string;
  modif_a: string;
  modif_por_ley: string;
  modif_a_ley: string;
  link_pub: string;
  ref_norm: string;
  obs: string;
  fecha_carga: Date;
  tipeo_dictado: string;
  deroga_dec: string;
  derogado_por: string;
  pendiente: string;
  obs_tomo: string;
  claves: string;
  __v: number;
}
