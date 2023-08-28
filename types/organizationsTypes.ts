import { IEntityMetadata } from './universalTypes';

export interface IOrganization extends IEntityMetadata {
  id?: number;
  name: string;
  pib?: string | null;
}
