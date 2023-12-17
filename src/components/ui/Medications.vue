<template>
    <div v-for="(arrayStore, index) in orderedHandbookItemsDrugs" :key="index" class="medications">
        <div class="items_block">
            <div class="medications_items">
                <q-item class="label">{{ arrayStore.catalogName }}</q-item>
                <span class="items">
                    {{ getItemDescription(arrayStore) }}</span>
                <!-- getCategoryName(arrayStore.storeName) || -->
            </div>

            <div class="medications_items">
                <q-btn class="ibtn" @click="showReferenceDialog(arrayStore)">
                    <q-icon name="menu_open" />
                </q-btn>
            </div>
            <reference-dialog v-model="arrayStore.referenceDialogVisible" :store="arrayStore" />
        </div>
    </div>
</template>

<script>
import ReferenceDialog from "../ReferenceDialog.vue"

import { handbookItemsDrugs } from "../../constants/catalog-names"
import { useRootStore } from "stores/store"
import { watch, ref } from "vue"


export default {
    name: 'Medication',
    components: {
        ReferenceDialog,
    },
    props: {
        // Проп для управления видимостью диалога
        showReferenceDialog: Function,
        // getCategoryName: Function

    },

    setup() {
        const store = useRootStore();
        const arrayStores = store.arrayStores

        const orderedHandbookItemsDrugs = handbookItemsDrugs.map( ( item ) => arrayStores.find( ( storeItem ) => storeItem.catalogName === item.catalogName ) );

        const drugs = ref( store.sessionDataDoses.drugs );

        watch( () => store.sessionDataDoses.drugs, ( newDrugs ) => {
            drugs.value = newDrugs;
        } );

        const getItemDescription = ( arrayStore ) => {
            return drugs.value || `Спр. '${ arrayStore.catalogName }'`
        };

        return {
            orderedHandbookItemsDrugs,
            handbookItemsDrugs,
            drugs,
            getItemDescription

        }
    }
}
</script>

<style lang="scss">
@import "../../css/app";

.medications {
    width: 100%;

}

.items_block {
    display: flex;
    gap: 2%;
    margin-bottom: 20px;

}

.medications_items {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
</style>../../constants/catalog-names
