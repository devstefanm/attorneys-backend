import { IEntityMetadata } from './universalTypes';

export enum EDebtorType {
  person = 'person',
  organization = 'organization',
}

export interface IDebtor extends IEntityMetadata {
  id?: number;
  type: EDebtorType;
  id_legal: boolean;
  cession: boolean;
  address: string;
  email: string;
  zip_code: string;
}
