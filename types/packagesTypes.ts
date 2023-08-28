import { IEntityMetadata, ITableResponseData } from './universalTypes';

export interface IPackage extends IEntityMetadata {
  id?: number;
  package_name: string;
}

export interface IPackageForList extends IPackage {
  case_count: string;
}

export interface IPackagesListApiResponseData extends ITableResponseData {
  packages: IPackageForList[];
}

export interface ICasePackageData {
  package: string;
}
