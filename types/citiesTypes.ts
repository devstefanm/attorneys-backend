import { IEntityMetadata } from './universalTypes';

export interface ICity extends IEntityMetadata {
  id?: number;
  name: string;
}
