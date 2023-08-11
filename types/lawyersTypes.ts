import { ICity } from './citiesTypes';
import { IPhoneNumber } from './phoneNumbersTypes';
import { IEntityMetadata, ITableResponseData } from './universalTypes';

export interface ILawyer extends IEntityMetadata {
  id?: number;
  office_name?: string | null;
  first_name: string;
  last_name: string;
  email?: string | null;
  address?: string | null;
}

export interface ILawyerForList extends ILawyer, ICity, IPhoneNumber {
  case_count: string;
}

export interface ILawyersListApiResponseData extends ITableResponseData {
  lawyers: ILawyerForList[];
}
