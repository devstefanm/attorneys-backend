import { IEntityMetadata } from './universalTypes';

export interface ILawyer extends IEntityMetadata {
  id?: number;
  office_name?: string | null;
  first_name: string;
  last_name: string;
  email?: string | null;
  address?: string | null;
}
