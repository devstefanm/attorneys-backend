import { IEntityMetadata, ITableResponseData } from './universalTypes';

export interface ISSNNumber extends IEntityMetadata {
  id?: number;
  ssn: number;
}

export interface ISSNForList extends ISSNNumber {
  case_count: string;
}

export interface ISSNListApiResponseData extends ITableResponseData {
  ssn_numbers: ISSNForList[];
}

export interface ICaseSSNData {
  ssn: string;
}

export interface ISSNNumberApiResponseData {
  id: number;
  ssn: string;
}
