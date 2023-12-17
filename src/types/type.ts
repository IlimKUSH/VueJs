export interface Entry {
  id: string;
  name: string | number;
  category?: string;
  bigCategory?: string;
}

export interface IProgram {
  id: string;
  img?: string;
  name: string;
  category?: string | undefined;
  bigCategory?: string | undefined;
  value?: number | undefined;
  group?: string;
}

export interface IHandbookItem {
  storeName: string;
  catalogName: string;
  withInput?: boolean;
  data: IProgram[];
}

export interface IHandbookItemInjection {
  id: string;
  catalogName: string;
  group?: string;
  storeName?: string;
}
