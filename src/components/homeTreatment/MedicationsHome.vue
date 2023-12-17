<template>
    <div v-for="(arrayStore, index) in orderedHandbookItemsDrugsHome" :key="index" class="medications">
        <div class="items_block">
            <div class="medications_items">
                <q-item class="lable">{{ arrayStore.catalogName }}</q-item>
                <span class="items">
                    {{ getItemDescription(arrayStore) }}</span>
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
import ReferenceDialog from "../../components/ReferenceDialog.vue"

import { handbookItemsDrugsHome } from "../../constants/catalog-names"
import { useRootStore } from "../../stores/store"
import { watch, ref } from "vue"


export default {
    name: 'Medication',
    components: {
        ReferenceDialog,
    },
    props: {
        showReferenceDialog: Function,
    },

    setup() {
        const store = useRootStore();
        const arrayStores = store.arrayStores

        const orderedHandbookItemsDrugsHome = handbookItemsDrugsHome.map( ( item ) => {
            return arrayStores.find( ( storeItem ) => {
                return storeItem.storeName === item.storeName;
            } );
        } );

        const drugsHome = ref( store.sessionHomeDoses.drugsHome );

        watch( () => store.sessionHomeDoses.drugsHome, ( newDrugs ) => {
            drugsHome.value = newDrugs;
        } );

        const getItemDescription = ( arrayStore ) => {
            return drugsHome.value || `Спр. '${ arrayStore.catalogName }'`
        };

        return {
            orderedHandbookItemsDrugsHome,
            handbookItemsDrugsHome,
            drugsHome,
            getItemDescription

        }
    }
}
</script>

<style lang="scss">
@import "../../css/app.scss";

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
</style>
