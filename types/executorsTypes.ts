import { ICity } from './citiesTypes';
import { IPhoneNumber } from './phoneNumbersTypes';
import { IEntityMetadata, ITableResponseData } from './universalTypes';

export interface IExecutor extends IEntityMetadata {
  id?: number;
  first_name?: string;
  last_name?: string;
  email?: string | null;
  address?: string | null;
  city_id?: number | null;
}

export interface IExecutorForList extends IExecutor, ICity, IPhoneNumber {
  case_count: string;
}

export interface IExecutorsListApiResponseData extends ITableResponseData {
  executors: IExecutorForList[];
}
