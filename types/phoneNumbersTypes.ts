import { IEntityMetadata } from './universalTypes';

export interface IPhoneNumber extends IEntityMetadata {
  id?: number;
  number: string;
  display_number?: string | null;
}
