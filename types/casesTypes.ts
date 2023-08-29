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

export interface ICase extends IEntityMetadata {
  id?: number;
  case_number: number;
  contract_number: number;
  state: EState;
  closing_date?: string;
  business_number?: number;
  principal: number;
  interest?: number;
}

export interface ICaseForList
  extends ICase,
    IDebtor,
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
