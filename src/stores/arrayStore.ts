import {ref, Ref} from "vue";
import {Entry} from "src/types/type";

interface ArrayStore {
  array: Ref<Entry[]>;
  catalogName: string;
  storeName: string;
  withInput?: boolean;

  addToPrescription: (selectedEntryId: string) => void;
  addEntry: (newEntry: Entry) => void;
  removeEntryById: (id: string) => void;
}

export const prescription = ref<Entry[]>([]);
export const afterArray = ref<Entry[]>([]);
export const homeArray = ref<Entry[]>([]);

export const createArrayStore = (
  initialArray: Entry[],
  catalogName: string,
  storeName: string,
  withInput?: boolean
): ArrayStore => {
  const array = ref(initialArray);

  const addEntry = (newEntry: Entry) => {
    newEntry.id = Date.now().toString();
    array.value.push(newEntry);
  };

  const removeEntryById = (id: string) => {
    array.value = array.value.filter((entry) => entry.id !== id);
  };

  const addToPrescription = (selectedEntryId: string) => {
    const selectedEntry = array.value.find(
      (entry) => entry.id === selectedEntryId
    );
    if (selectedEntry) {
      const category = selectedEntry.category;

      prescription.value = prescription.value.filter(
        (item) => item.category !== category
      );
      prescription.value.push(selectedEntry);
    }
  };

  return {
    array,
    addEntry,
    removeEntryById,
    catalogName,
    storeName,
    withInput,
    addToPrescription,
  };
};
