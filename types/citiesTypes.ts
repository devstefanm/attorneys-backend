import { IEntityMetadata, ITableResponseData } from './universalTypes';

export interface ICity extends IEntityMetadata {
  id?: number;
  name: string;
}

export interface ICityForList extends ICity {
  debtor_count: string;
  executor_count: string;
  lawyer_count: string;
}

export interface ICitiesListApiResponseData extends ITableResponseData {
  cities: ICityForList[];
}

export interface ICreateCityApiResponseData {
  city_id: number | null;
}

export interface ICityApiResponseData {
  id: number;
  name: string;
}
