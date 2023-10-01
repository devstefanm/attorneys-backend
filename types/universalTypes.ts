export interface IEntityMetadata {
  created_by?: string;
  updated_by?: string;
  created_at?: string;
  updated_at?: string;
}

export interface ITableMetadata {
  sort: string;
  sortBy: string;
  total_number: number;
  total_pages: number;
  page: number;
}

export interface ITableResponseData {
  meta: ITableMetadata;
}

export interface ICreateEntityApiResponseData {
  id: number | null;
}

export interface IGetEntityApiResponseData {
  id: number;
  name: string;
}
