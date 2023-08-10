import { IEntityMetadata } from './universalTypes';

export interface IBusinessNumber extends IEntityMetadata {
  id?: number;
  number: string;
}
