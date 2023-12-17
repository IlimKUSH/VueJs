import { deskBook } from "../constants/deskBook-items";

import { defineStore } from "pinia";
import { ref } from "vue";
import { createArrayStore } from "./arrayStore";

import { handbookItems } from "../constants/handBook-items";
import { prescription, afterArray, homeArray } from "./arrayStore";
import { createDeskBookStore } from "./deskBookStore";

export const useRootStore = defineStore("root", () => {
  const selectedProgram = ref<string | null>(null);
  const selectedInjection = ref<string | null>(null);

  const selectProgram = (programName: string) => {
    selectedProgram.value = programName;
    const category = "program";
    prescription.value = prescription.value.filter(
      (item) => item.category !== category
    );
    prescription.value.push({
      id: Date.now().toString(),
      name: programName,
      category: "program",
      bigCategory: "program",
    });
  };

  const selectInjection = (injectionName: string) => {
    selectedInjection.value = injectionName;
    const category = "injection";
    prescription.value = prescription.value.filter(
      (item) => item.category !== category
    );
    prescription.value.push({
      id: Date.now().toString(),
      name: injectionName,
      category: "injection",
      bigCategory: "injection",
    });
  };

  const addInputValueToPrescription = () => {
    if (inputValue.value !== null) {
      prescription.value.push({
        category: "hubs",
        bigCategory: "hubs",
        id: Date.now().toString(),
        name: inputValue.value,
      });
    }
  };

  const addSessionDataToPrescription = () => {
    const sessionDataValue = sessionData.value;
    prescription.value.push(
      {
        bigCategory: "bikorbonat",
        category: "bikorbonat",
        id: Date.now().toString(),
        name: sessionDataValue.bikorbonat!,
      },
      {
        bigCategory: "bikorbonat",
        category: "bikorbonat",
        id: Date.now().toString(),
        name: sessionDataValue.unit!,
      },
      {
        bigCategory: "weight",
        category: "weight",
        id: Date.now().toString(),
        name: sessionDataValue.weight + "кг",
      },
      {
        bigCategory: "antikogulant",
        category: "antikogulant",
        id: Date.now().toString(),
        name: sessionDataValue.antikogulant!,
      },
      {
        bigCategory: "antikogulant",
        category: "antikogulant",
        id: Date.now().toString(),
        name: sessionDataValue.volume!,
      }
    );
  };

  const arrayStores = handbookItems.map((item) => {
    return createArrayStore(
      item.data,
      item.catalogName,
      item.storeName,
      item.withInput
    );
  });

  const deskBookStores = deskBook.map((item) => {
    return createDeskBookStore(item.data, item.catalogName, item.storeName);
  });

  const inputValue = ref<number | null>(null);
  const sessionData = ref({
    bikorbonat: null,
    unit: null,
    weight: null,
    antikogulant: null,
    volume: null,
  });

  const sessionDataDoses = ref({
    drugDoses: "",
    methodRoute: "",
    drugs: null,
  });

  const sessionHomeDoses = ref({
    drugDosesHome: "", // Выбранный бикарбонат
    methodRouteHome: "",
    freguencyHome: "",
    drugsHome: "",
    startDateHome: ref(""),
    endDateHome: ref(""),
    quantityHome: ref(""),
  });
  const addSessionDataToAfterArray = () => {
    const sessionDataObject = {
      id: Date.now().toString(),
      drugs: sessionDataDoses.value.drugs,
      drugDoses: sessionDataDoses.value.drugDoses,
      methodRoute: sessionDataDoses.value.methodRoute,
      selectedDays: selectedDays.value.join(","),
      startDate: startDate.value,
      endDate: endDate.value,
      quantity: selectedDays.value.length,
    };

    afterArray.value.push(sessionDataObject);
  };

  const addSessionDataToHomeArray = () => {
    const sessionDataObject = {
      id: Date.now().toString(),
      drugsHome: sessionHomeDoses.value.drugsHome,
      drugDosesHome: sessionHomeDoses.value.drugDosesHome,
      methodRouteHome: sessionHomeDoses.value.methodRouteHome,
      freguencyHome: sessionHomeDoses.value.freguencyHome,
      startDateHome: sessionHomeDoses.value.startDateHome,
      endDateHome: sessionHomeDoses.value.endDateHome,
      quantityHome: sessionHomeDoses.value.quantityHome,
    };

    homeArray.value.push(sessionDataObject);
  };

  const numberOfDays = ref([1, 2, 3, 4, 5, 6, 7]);
  const selectedDays = ref([]);

  const toggleDay = (day) => {
    const index = selectedDays.value.indexOf(day);
    if (index !== -1) {
      selectedDays.value.splice(index, 1);
    } else {
      selectedDays.value.push(day);
    }
  };

  const startDate = ref("");
  const endDate = ref("");

  return {
    selectedProgram,
    selectedInjection,
    selectProgram,
    selectInjection,
    arrayStores,
    inputValue,
    addInputValueToPrescription,
    sessionData,
    sessionDataDoses,
    addSessionDataToPrescription,
    deskBookStores,
    addSessionDataToAfterArray,
    selectedDays,
    numberOfDays,
    toggleDay,
    startDate,
    endDate,
    sessionHomeDoses,
    addSessionDataToHomeArray,
  };
});
