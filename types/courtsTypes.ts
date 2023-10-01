import { IEntityMetadata, ITableResponseData } from './universalTypes';

export interface ICourt extends IEntityMetadata {
  id?: number;
  name: string;
}

export interface ICourtForList extends ICourt {
  case_count: string;
}

export interface ICourtsListApiResponseData extends ITableResponseData {
  courts: ICourtForList[];
}

export interface ICaseCourtData {
  court_name: string;
}

export interface ICourtApiResponseData {
  id: number;
  name: string;
}
