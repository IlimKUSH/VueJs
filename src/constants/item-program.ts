// Определение интерфейса для массива программ
import { IProgram } from "../types/type";
// interface IProgram {
//     id: string;
//     img?: string;
//     name: string;
//     category?: string | undefined;
//     bigCategory?: string | undefined;
//     value?: number | undefined;
//     group?: string;
//   }

interface IHandbookItemInjection {
  id: string;
  catalogName: string;
  group?: string;
  storeName?: string;
}
// Создание константы programs с массивом программ
export const programs: IProgram[] = [
  {
    id: "1",
    name: "HD",
    category: "programs",
    bigCategory: "programs",
    group: "1",
  },
  {
    id: "2",
    name: "HDF",
    category: "programs",
    bigCategory: "programs",
    group: "1",
  },
  {
    id: "3",
    name: "UF",
    category: "programs",
    bigCategory: "programs",
    group: "1",
  },
];

export const injections: IProgram[] = [
  {
    id: "1",
    name: "Игла",
    category: "injections",
    bigCategory: "injections",
    group: "1",
  },
  {
    id: "2",
    name: "Катетер",
    category: "injections",
    bigCategory: "injections",
    group: "1",
  },
];
