import { IEntityMetadata } from './universalTypes';

export enum EDebtorType {
  person = 'person',
  organization = 'organization',
}

export interface IDebtor extends IEntityMetadata {
  id?: number;
  type?: EDebtorType;
  is_legal?: boolean | '';
  cession?: boolean | '';
  address?: string;
  email?: string;
  zip_code?: string;
  city_id?: number;
  city?: string;
  person_id?: number;
  organization_id?: number;
}
