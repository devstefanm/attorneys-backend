import { IEntityMetadata } from './universalTypes';

export interface IFile extends IEntityMetadata {
  id?: number;
  filename: string;
  path: string;
  mime_type: string;
  size: number;
}
