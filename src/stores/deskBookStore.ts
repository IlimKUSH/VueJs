import {ref, Ref, UnwrapRef} from "vue";
import { IProgram } from "src/types/type";

export const createDeskBookStore = (
  initialArray: IProgram[],
  catalogName: string,
  storeName: string
): { catalogName: string; array: Ref<UnwrapRef<any>>; storeName: string } => {
  const array = ref(initialArray);

  return {
    array,
    catalogName,
    storeName,
  };
};
