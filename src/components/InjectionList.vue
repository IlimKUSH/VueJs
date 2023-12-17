<template>
    <div class="injection">
        <q-item class="lable">Тип инъекции</q-item>
        <div class="btn-items">
            <q-btn class="btn" v-for="inject in injectionList" :key="inject.id" flat @click="chooseInjection(inject.name)"
                :class="{ active: inject.name === selectedInjection }">
                {{ inject.name }}
            </q-btn>
        </div>

    </div>


    <div class="injection-container">
        <div v-for="(arrayStore, index) in orederHandbooksItemsNext" :key="index">
            <div class="injection-items">
                <span class="items">
                    {{ getCategoryName(arrayStore.storeName) || `Спр. '${arrayStore.catalogName}'` }}</span>


                <q-btn class="ibtn" @click="showReferenceDialog(arrayStore)"
                    :disabled="!selectedInjection || !isItemActive(arrayStore)">
                    <q-icon name="menu_open" />
                </q-btn>
            </div>
            <reference-dialog v-model="arrayStore.referenceDialogVisible" :store="arrayStore" />
        </div>
    </div>
</template>

<script>
import { useRootStore } from 'src/stores/store';
import { ref } from "vue";
import { injections, } from '../constants/item-program';
import { handbookItemsInjection } from '../constants/catalog-names'
import ReferenceDialog from "../components/ReferenceDialog.vue"
export default {
    name: 'InjectionList',
    components: {
        ReferenceDialog,
    },
    props: {
        // Проп для управления видимостью диалога
        showReferenceDialog: Function,
        getCategoryName: Function

    },

    setup() {
        const injectionList = ref( injections );
        const selectedInjection = ref( null ); // Одна переменная для выбранной инъекции
        const store = useRootStore();
        const arrayStores = store.arrayStores

        const chooseInjection = ( injectName ) => {
            selectedInjection.value = injectName
            store.selectInjection( injectName );
        };

        const orederHandbooksItemsNext = handbookItemsInjection.map( ( item ) => arrayStores.find( ( storeItem ) => storeItem.catalogName === item.catalogName ) );

        const isItemActive = ( arrayStore ) => {
            if ( !selectedInjection.value ) return true; // Если инъекция не выбрана, все элементы не активны
            if ( selectedInjection.value === "Игла" ) {

                // Если выбрана инъекция "Игла", активируем элементы с catalogName "Иглы" и "Типы игл"
                return arrayStore.catalogName === "Иглы" || arrayStore.catalogName === "Типы игл";
            }
            if ( selectedInjection.value === "Катетер" ) {
                // Если выбрана инъекция "Катетер", активируем элементы с catalogName "Катетеры" и "Типы Катетеров"
                return arrayStore.catalogName === "Катетеры" || arrayStore.catalogName === "Типы Катетеров";
            }
            return true;
        };
        return {
            injectionList,
            selectedInjection,
            chooseInjection,
            orederHandbooksItemsNext,
            isItemActive,
            arrayStores
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../css/app.scss";

.btn-items {
    display: flex;
    gap: 2%;
}

.injection {
    margin-bottom: 20px;
}

.injection-container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 5%;
    margin-bottom: 20px;

}

.injection-items {
    display: flex;
    margin-bottom: 10px;
    gap: 5%;
    // border: 1px solid red;

}
</style>../constants/catalog-names