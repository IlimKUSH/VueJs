<template>
  <q-page class="q-pa-md d-flex flex-center justify-center">
    <div class="container">
      <q-card-section>
        <div class="title_container">
          <p class="title">Сеанс гемодиализа</p>
          <p class="label">Номер месяца</p>
        </div>
        <p class="title">Назначение сеанса гемодиализа</p>
      </q-card-section>

      <q-card-section>
        <ProgramList />
        <DialyzersAndHubsList :show-reference-dialog="showReferenceDialog" :get-category-name="getCategoryName" />
        <injectionList :show-reference-dialog="showReferenceDialog" :get-category-name="getCategoryName" />
        <BicarbonateValuesList :open-unit-dialog="openUnitDialog" />
        <q-btn class="save-btn" @click="saveData">Сформировать сеанс</q-btn>
        <Reciept />
      </q-card-section>

      <q-card-section class="divider">
        <p class="title">Назначение после сеанса</p>
        <Medication :show-reference-dialog="showReferenceDialog" />
        <Doses :open-unit-dialog="openUnitDialog" />
        <NumberOfSeans />
        <Dates :startDateProp="startDate" :endDateProp="endDate" :selectedDaysProp="selectedDays"
          @update-start-date="updateStartDate" @update-end-date="updateEndDate"
          @update-selected-days="updateSelectedDays" />
        <q-btn class="save-btn" @click="saveAfterData">Сформировать</q-btn>
        <Table />
      </q-card-section>

      <q-card-section>
        <p class="title" style="margin-bottom: 20px">Лечение на дому</p>
        <MedicationsHome :show-reference-dialog="showReferenceDialog" />
        <HomeDoses :open-unit-dialog="openUnitDialog" />
        <Dates :startDateProp="startDateHome" :endDateProp="endDateHome" @update-start-date="updateStartDateHome"
          @update-end-date="updateEndDateHome" />
        <q-btn class="save-btn" @click="saveHomeData">Добавить</q-btn>
        <RecieptHome />
      </q-card-section>
    </div>
  </q-page>
</template>

<script>
import { useRootStore } from "../stores/store";

import { prescription, afterArray, homeArray } from "../stores/arrayStore/";
import Reciept from "../components/Reciept.vue";
import ProgramList from "../components/ProgramList.vue"
import injectionList from "../components/InjectionList.vue"
import DialyzersAndHubsList from "../components/DialyzersAndHubsList.vue"
import BicarbonateValuesList from "../components/BicarbonateValuesList.vue"
import Medication from "components/ui/Medications.vue"
import Doses from "components/ui/Doses.vue"
import NumberOfSeans from "components/ui/NumberOfSeans.vue"
import Dates from "components/ui/Dates.vue"
import Table from "components/ui/Table.vue"
import HomeDoses from "../components/homeTreatment/DosesHome.vue"
import MedicationsHome from "../components/homeTreatment/MedicationsHome.vue"
import RecieptHome from "../components/homeTreatment/RecieptHome.vue"


export default {
  name: "IndexPage",
  components: {
    ProgramList,
    injectionList,
    DialyzersAndHubsList,
    Reciept,
    BicarbonateValuesList,
    Medication,
    Doses,
    NumberOfSeans,
    Dates,
    Table,
    HomeDoses,
    MedicationsHome,
    RecieptHome,
  },
  setup() {

    const store = useRootStore();

    const startDate = store.startDate
    const endDate = store.endDate
    const selectedDays = store.selectedDays

    const updateStartDate = ( newStartDate ) => {
      store.startDate = newStartDate;
    };
    const updateEndDate = ( newEndDate ) => {
      store.endDate = newEndDate;
    };
    const updateSelectedDays = ( newSelectedDays ) => {
      store.selectedDays = newSelectedDays
    }

    const startDateHome = store.sessionHomeDoses.startDateHome
    const endDateHome = store.sessionHomeDoses.endDateHome

    const updateStartDateHome = ( newStartDate ) => {
      store.sessionHomeDoses.startDateHome = newStartDate;
    };
    const updateEndDateHome = ( newEndDate ) => {
      store.sessionHomeDoses.endDateHome = newEndDate;
    };



    const showReferenceDialog = ( arrayStore ) => {
      arrayStore.referenceDialogVisible = true;
    };

    const openUnitDialog = ( descBookStore ) => {
      descBookStore.unitDialogVisible = true;
    }

    function getCategoryName( storeName ) {

      const selectedEntry = prescription.value.find( ( item ) => item.category === storeName );
      return selectedEntry ? selectedEntry.name : null;
    }

    const saveData = () => {
      console.log( prescription.value.length );
      if ( prescription.value.length < 7 ) {
        store.addInputValueToPrescription()
        store.addSessionDataToPrescription()

      }
    }

    const saveAfterData = () => {
      store.addSessionDataToAfterArray()
    }

    const saveHomeData = () => {
      store.addSessionDataToHomeArray()
    }


    console.log( homeArray.value );

    return {
      showReferenceDialog,
      prescription,
      afterArray,
      getCategoryName,
      openUnitDialog,
      saveData,
      saveAfterData,
      startDate,
      endDate,
      selectedDays,
      updateStartDate,
      updateEndDate,
      updateSelectedDays,
      startDateHome,
      endDateHome,
      updateStartDateHome,
      updateEndDateHome,
      saveHomeData
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../css/app.scss";


.title_container {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 20%;
  margin-bottom: 20px;
}

.save-btn {
  border: 1px solid grey;
  margin-bottom: 20px;
  width: 200px;
}

.divider {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
