import { IEntityMetadata } from './universalTypes';

export interface IRole extends IEntityMetadata {
  id?: number;
  name: string;
  display_name?: string;
}
