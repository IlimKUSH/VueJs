import { IHandbookItemInjection } from "../types/type";

export const handbookItemsInjection: IHandbookItemInjection[] = [
  { id: "1", catalogName: "Катетеры", group: "1" },
  { id: "2", catalogName: "Типы Катетеров", group: "1" },
  { id: "3", catalogName: "Иглы", group: "1" },
  { id: "4", catalogName: "Типы игл", group: "1" },
];

export const handbookItemsDialyzersAndHubs: IHandbookItemInjection[] = [
  { id: "1", catalogName: "Диализаторы", group: "1" },
  { id: "2", catalogName: "Концентраторы", group: "1" },
];

export const handbookItemsDrugs: IHandbookItemInjection[] = [
  { id: "1", catalogName: "Лекарственные препараты", group: "2" },
];

export const handbookItemsDrugsHome: IHandbookItemInjection[] = [
  {
    id: "1",
    catalogName: "Лекарственные препараты",
    group: "3",
    storeName: "drugsHome",
  },
];
