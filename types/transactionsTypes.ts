import { ICase } from './casesTypes';
import { IExcerpt } from './excerptsTypes';
import { IEntityMetadata, ITableResponseData } from './universalTypes';

export enum ETransactionType {
  payment = 'payment',
  fee = 'fee',
  legal_fee = 'legal_fee',
}

export interface ITransaction extends IEntityMetadata {
  id?: number;
  type: ETransactionType;
  amount: number;
  posting_method: string;
  payment_date: string;
}

export interface ITransactionForList extends ITransaction, ICase, IExcerpt {}

export interface ITransactionsListApiResponseData extends ITableResponseData {
  transactions: ITransactionForList[];
}
