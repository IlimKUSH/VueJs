<template>
    <div v-for="(arrayStore, index) in orderedHandbookItems" :key="index" class="dialyzers">
        <div class="items_block">
            <div class="dialyzers_items">
                <q-item class="lable">{{ arrayStore.catalogName }}</q-item>
                <span class="items">
                    {{ getCategoryName(arrayStore.storeName) || `Спр. '${arrayStore.catalogName}'` }}</span>
            </div>

            <div class="dialyzers_items">
                <q-btn class="ibtn" @click="showReferenceDialog(arrayStore)">
                    <q-icon name="menu_open" />
                </q-btn>
            </div>

            <div v-if="arrayStore.withInput" class="dialyzers_items">
                <q-item class="lable" style="text-align: center;">Обьем</q-item>
                <q-input class="inp" v-model="inputValue" outlined suffix="л" />
            </div>
            <reference-dialog v-model="arrayStore.referenceDialogVisible" :store="arrayStore" />
        </div>
    </div>
</template>

<script>

import { computed } from 'vue'
import { useRootStore } from 'src/stores/store';
import { handbookItemsDialyzersAndHubs } from '../constants/catalog-names';
import ReferenceDialog from "../components/ReferenceDialog.vue"

export default {
    name: 'DialyzersAndHubsList',
    components: {
        ReferenceDialog,
    },
    props: {
        showReferenceDialog: Function,
        getCategoryName: Function
    },

    setup() {
        const store = useRootStore();
        const arrayStores = store.arrayStores
        const orderedHandbookItems = handbookItemsDialyzersAndHubs.map( ( item ) => arrayStores.find( ( storeItem ) => storeItem.catalogName === item.catalogName ) );
        const inputValue = computed( {
            get: () => store.inputValue,
            set: ( value ) => {
                store.inputValue = value;
            },
        } );

        return {
            orderedHandbookItems,
            arrayStores,
            handbookItemsDialyzersAndHubs,
            inputValue
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../css/app.scss";

.dialyzers {
    width: 100%;
}

.items_block {
    display: flex;
    gap: 2%;

}

.dialyzers_items {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
</style>../constants/catalog-names
