import { IEntityMetadata } from './universalTypes';

export interface ICourt extends IEntityMetadata {
  id?: number;
  name: string;
}
