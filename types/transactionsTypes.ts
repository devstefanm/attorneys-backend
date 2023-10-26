import { CellValue } from 'exceljs';
import { IExcerpt } from './excerptsTypes';
import { IEntityMetadata, ITableResponseData } from './universalTypes';

export enum ETransactionType {
  payment = 'payment',
  fee = 'fee',
  legal_fee = 'legal_fee',
  withdrawal = 'withdrawal',
}

export interface ITransaction extends IEntityMetadata {
  id?: number;
  type?: ETransactionType | string;
  amount?: number;
  posting_method?: string;
  payment_date?: string | Date;
  case_id?: number | null;
  case_number?: string | number;
}

export interface ITransactionForList extends ITransaction, Partial<IExcerpt> {}

export interface ITransactionsListApiResponseData extends ITableResponseData {
  transactions: ITransactionForList[];
  total_amount?: string | null;
}

export interface ICreateTransactionApiResponseData {
  transaction_id: number | null;
}

export interface ITransactionApiResponseData {
  id: number;
  type: ETransactionType;
  amount: number;
  posting_method: string;
  payment_date: string;
  case: {
    id: number;
    name: string | null;
    first_name: string | null;
    last_name: string | null;
    case_number: string;
  };
}

export interface ICaseTransaction {
  amount: string;
  type: string;
}

export interface ITransactionForImport {
  [key: string]: string | string[] | undefined | null | CellValue;
}
