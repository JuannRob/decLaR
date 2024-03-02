export interface InputData {
  fieldName: string;
  inputValue: string;
  isDisabled: boolean;
}

export interface Options {
  limit: number;
  page: number;
  sortBy: string;
  order: 1 | -1;
}

export interface SearchParams {
  [key: string]: string;
}

export type ApiRequest = SearchParams & Options;
