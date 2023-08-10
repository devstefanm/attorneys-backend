import { IEntityMetadata } from './universalTypes';

export interface IExcerpt extends IEntityMetadata {
  id?: number;
  excerpt_number: number;
}
