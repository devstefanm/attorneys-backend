import { IEntityMetadata } from './universalTypes';

export interface IPeople extends IEntityMetadata {
  id?: number;
  first_name?: string;
  last_name?: string;
  jmbg?: string;
  employed?: boolean;
  employer_id?: number | null;
}
