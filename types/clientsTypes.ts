import { IEntityMetadata, ITableResponseData } from './universalTypes';

export interface IClient extends IEntityMetadata {
  id?: number;
  name: string;
}

export interface IClientForList extends IClient {
  case_count: string;
}

export interface IClientsListApiResponseData extends ITableResponseData {
  clients: IClientForList[];
}

export interface ICaseClientData {
  client_name: string;
}
