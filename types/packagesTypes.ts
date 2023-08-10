import { IEntityMetadata } from './universalTypes';

export interface IPackage extends IEntityMetadata {
  id?: number;
  package_name: string;
}
