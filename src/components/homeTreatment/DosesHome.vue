<template>
    <div class="doses">
        <div v-for="(descBookStore, index) in descBookStores" :key="index">
            <div v-if="descBookStore.array.some(item => item.group === '3') && descBookStore.catalogName === 'Дозировка'">
                <div class="bkr-items">
                    <div class="bkr-items-inner">
                        <q-item class="lable">{{ descBookStore.catalogName }}</q-item>
                        <span class="items antikogulant-lable">{{ drugDosesHome || "Наименование" }}</span>
                    </div>
                    <q-btn class="ibtn" @click="openUnitDialog(descBookStore)">
                        <q-icon name="menu_open" />
                    </q-btn>
                    <unit-dialog v-model="descBookStore.unitDialogVisible" :store="descBookStore" />
                </div>
            </div>
            <div v-if="descBookStore.array.some(item => item.group === '3') && descBookStore.catalogName === 'Путь приема'">
                <div class="bkr-items">
                    <div class="bkr-items-inner">
                        <q-item class="lable">{{ descBookStore.catalogName }}</q-item>
                        <span class="items antikogulant-lable">{{ methodRouteHome || "Наименование" }}</span>
                    </div>
                    <q-btn class="ibtn" @click="openUnitDialog(descBookStore)">
                        <q-icon name="menu_open" />
                    </q-btn>
                    <unit-dialog v-model="descBookStore.unitDialogVisible" :store="descBookStore" />
                </div>
            </div>
            <div
                v-if="descBookStore.array.some(item => item.group === '3') && descBookStore.catalogName === 'Кратность приема'">
                <div class="bkr-items">
                    <div class="bkr-items-inner">
                        <q-item class="lable">{{ descBookStore.catalogName }}</q-item>
                        <span class="items antikogulant-lable">{{ freguencyHome || "Наименование" }}</span>
                    </div>
                    <q-btn class="ibtn" @click="openUnitDialog(descBookStore)">
                        <q-icon name="menu_open" />
                    </q-btn>
                    <unit-dialog v-model="descBookStore.unitDialogVisible" :store="descBookStore" />
                </div>
            </div>
        </div>
    </div>
</template>



<script>
import { watch, ref } from 'vue'
import { useRootStore } from "../../stores/store"
import UnitDialog from '../UnitDialog.vue';

export default {
    name: 'DosesHome',
    components: {
        UnitDialog,
    },
    props: {
        openUnitDialog: Function,
    },

    setup() {
        const store = useRootStore();
        const descBookStores = store.deskBookStores
        const drugDosesHome = ref( store.sessionHomeDoses.drugDosesHome );
        const methodRouteHome = ref( store.sessionHomeDoses.methodRouteHome )
        const freguencyHome = ref( store.sessionHomeDoses.freguencyHome )

        watch(
            [ () => store.sessionHomeDoses.drugDosesHome,
            () => store.sessionHomeDoses.methodRouteHome,
            () => store.sessionHomeDoses.freguencyHome ],
            ( [ drugDosesHomeValue, methodRouteHomeValue, freguencyHomeValue ] ) => {
                drugDosesHome.value = drugDosesHomeValue;
                methodRouteHome.value = methodRouteHomeValue;
                freguencyHome.value = freguencyHomeValue;
            }
        );

        return {
            descBookStores,
            drugDosesHome,
            methodRouteHome,
            freguencyHome
        }
    }
}
</script>


<style lang="scss" scoped>
@import "../../css/app.scss";

.doses {
    display: flex;
    margin-bottom: 20px;
}


.bkr-items {
    display: flex;
    gap: 20px;
    margin-right: 40px;
}

.bkr-items-inner {
    display: flex;
    flex-direction: column;
}

.patient {
    width: 100px;
}

.antikogulant-lable {
    width: clamp(150px, 15vw, 300px);
}
</style>
