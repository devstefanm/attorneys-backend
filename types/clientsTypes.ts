import { IEntityMetadata } from './universalTypes';

export interface IClient extends IEntityMetadata {
  id?: number;
  name: string;
}
