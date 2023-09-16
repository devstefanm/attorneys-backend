import { ICaseClientData } from './clientsTypes';
import { ICaseCourtData } from './courtsTypes';
import { IDebtor } from './debtorsTypes';
import { ICaseLawyerData } from './lawyersTypes';
import { IOrganization } from './organizationsTypes';
import { ICasePackageData } from './packagesTypes';
import { IPeople } from './peopleTypes';
import { ICaseSSNData } from './ssnNumbersTypes';
import { IEntityMetadata, ITableResponseData } from './universalTypes';

export enum EState {
  active = 'active',
  closed = 'closed',
}

export interface ICase extends IEntityMetadata, IDebtor {
  id?: number;
  case_number?: number;
  contract_number?: number;
  state?: EState;
  closing_date?: string;
  business_number?: number;
  principal?: number;
  interest?: number;
  lawyer_id?: number;
  client_id?: number;
  court_id?: number;
  ssn_number_id?: number;
  package_id?: number;
  debtor_id?: number;
}

export interface ICaseForList
  extends ICase,
    IPeople,
    IOrganization,
    ICaseLawyerData,
    ICaseClientData,
    ICaseCourtData,
    ICaseSSNData,
    ICasePackageData {}

export interface ICasesListApiResponseData extends ITableResponseData {
  cases: ICaseForList[];
}

export interface IPostCaseData {
  caseData: ICase;
  debtorData: IDebtor;
  personData: IPeople;
  organizationData: IOrganization;
  lawyerData: ICaseLawyerData;
  clientData: ICaseClientData;
  courtData: ICaseCourtData;
  ssnData: ICaseSSNData;
  packageData: ICasePackageData;
}

export interface ICreateCaseApiResponseData {
  case_id: number;
}

export interface ICaseApiResponseData {
  id: number;
  case_number: string;
  contract_number: string;
  closing_date: string;
  state: string;
  principal: number;
  interest: number;
  is_legal: boolean;
  cession: string;
  address: string;
  email: string;
  zip_code: string;
  first_name: string;
  last_name: string;
  jmbg: string;
  employed: boolean;
  name: string;
  pib: string;
  lawyer: {
    id: number;
    office_name: string;
    first_name: string;
    last_name: string;
  };
  ssn_number: {
    id: number;
    ssn: string;
  };
  package: {
    id: number;
    package_name: string;
  };
  status: {
    id: number;
    name: string;
  };
  client: {
    id: number;
    name: string;
  };
  court: {
    id: number;
    name: string;
  };
  city: {
    id: number;
    name: string;
  };
  employer: {
    id: number;
    name: string;
  };
  executors: {
    id: number;
    first_name: string;
    last_name: string;
  }[];
  business_numbers: {
    id: number;
    number: string;
  }[];
  phone_numbers: string[];
}
