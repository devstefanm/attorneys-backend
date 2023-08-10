import { IEntityMetadata } from './universalTypes';

export interface IUser extends IEntityMetadata {
  id: number;
  first_name?: string | null;
  last_name?: string | null;
  username: string;
  email: string;
  password: string;
}
