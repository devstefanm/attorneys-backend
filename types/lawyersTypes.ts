import { ICity } from './citiesTypes';
import { IPhoneNumber } from './phoneNumbersTypes';
import { IEntityMetadata, ITableResponseData } from './universalTypes';

export interface ILawyer extends IEntityMetadata {
  id?: number;
  office_name?: string | null;
  first_name?: string;
  last_name?: string;
  email?: string | null;
  address?: string | null;
  city_id?: number | null;
}

export interface ILawyerForList extends ILawyer, ICity, IPhoneNumber {
  case_count: string;
}

export interface ILawyersListApiResponseData extends ITableResponseData {
  lawyers: ILawyerForList[];
}

export interface ICaseLawyerData {
  lawyer_office_name: string;
  lawyer_first_name: string;
  lawyer_last_name: string;
}

export interface ILawyerApiResponseData {
  id: number;
  office_name: string;
  first_name: string;
  last_name: string;
  email: string | null;
  address: string | null;
  city: {
    id: number;
    name: string;
  };
  phone_numbers: string[];
}
