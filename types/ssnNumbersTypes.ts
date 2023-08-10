import { IEntityMetadata } from './universalTypes';

export interface ISSNNumber extends IEntityMetadata {
  id?: number;
  ssn: number;
}
