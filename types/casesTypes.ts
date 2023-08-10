import { IDebtor } from './debtorsTypes';
import { IOrganization } from './organizationsTypes';
import { IPeople } from './peopleTypes';
import {
  IEntityMetadata,
  ITableMetadata,
  ITableResponseData,
} from './universalTypes';

export enum EStatus {
  active = 'active',
  closed = 'closed',
}

export interface ICase extends IEntityMetadata {
  id?: number;
  case_number: number;
  contract_number: number;
  status: EStatus;
  closing_date?: string;
  business_number?: number;
  principal: number;
  interest?: number;
}

export interface ICaseForList extends ICase, IDebtor, IPeople, IOrganization {
  lawyer_office_name: string;
  lawyer_first_name: string;
  lawyer_last_name: string;
  client_name: string;
  court_name: string;
  ssn: string;
  package: string;
}

export interface ICasesListApiResponseData extends ITableResponseData {
  cases: ICaseForList[];
}
