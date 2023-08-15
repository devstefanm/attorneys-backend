import { ITableResponseData } from './universalTypes';

export interface IEmployer {
  id?: number;
  name: string;
}

export interface IEmployerForList extends IEmployer {
  employees_count: string;
}

export interface IEmployersListApiResponseData extends ITableResponseData {
  employers: IEmployerForList[];
}
