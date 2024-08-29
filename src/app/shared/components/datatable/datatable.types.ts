export type ColumnType =
  | 'string'
  | 'date'
  | 'currency'
  | 'number'
  | 'customDisplay'
  | 'htmlContent';

export type CustomDisplayType = 'string' | 'date' | 'currency' | 'number';

export interface DataTableColumn<T> {
  prop: string;
  name: string;
  type: ColumnType;
  sortable?: boolean;
  classes?: (item: T) => string[];
  handleCustomDisplay?: (item: T) => any;
  handleHtmlContent?: (item: T) => any;
}

export interface DataTableConfig {
  property: string;
  uniqueIdentifier: string;
  selection?: boolean;
  hasActions?: boolean;

  rowClickable?: boolean;
}

export interface TableEntity {
  [key: string]: any;
}
