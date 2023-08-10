import { IEntityMetadata } from './universalTypes';

export interface IExecutor extends IEntityMetadata {
  id?: number;
  first_name: string;
  last_name: string;
  email?: string | null;
  address?: string | null;
}
