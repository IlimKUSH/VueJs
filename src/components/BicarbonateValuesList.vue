<template>
    <div class="bkr-container">
        <div v-for="(descBookStore, index) in descBookStores" :key="index">
            <div v-if="descBookStore.catalogName === 'Бикорбонат'" class="bkr-items">
                <div class="bkr-items-inner">
                    <q-item class="lable">Бикарбонат</q-item>
                    <q-input class="inp" outlined v-model="bikorbonat" type="unit" :suffix="unitSuffix" />
                </div>

                <q-btn @click="openUnitDialog(descBookStore)" class="ibtn">
                    <q-icon name="menu_open" />
                </q-btn>
            </div>
            <unit-dialog v-model="descBookStore.unitDialogVisible" :store="descBookStore" />
        </div>

        <div class="bkr-items-inner">
            <q-item class="lable patient">Сухой вес пациента</q-item>
            <q-input class="inp" outlined v-model="patientWeight" type="unit" suffix="кг" />
        </div>

        <div v-for="(descBookStore, index) in descBookStores" :key="index">
            <div v-if="descBookStore.catalogName === 'Антикоагуляция'">
                <div class="bkr-items">
                    <div class="bkr-items-inner">
                        <q-item class="lable">Антикогуляция</q-item>
                        <span class="items antikogulant-lable">{{ antikogulant || "Наименование" }}</span>
                    </div>
                    <q-btn class="ibtn" @click="openUnitDialog(descBookStore)">
                        <q-icon name="menu_open" />
                    </q-btn>
                    <unit-dialog v-model="descBookStore.unitDialogVisible" :store="descBookStore" />
                </div>

            </div>
            <div>
            </div>
        </div>

        <div class="bkr-items-inner">
            <q-item class="lable">Обьем</q-item>
            <q-input class="inp" outlined v-model="volume" type="unit" suffix="ед" />
        </div>
    </div>
</template>

<script>
import { computed, watch, ref } from 'vue'
import { useRootStore } from 'src/stores/store';
import UnitDialog from './UnitDialog.vue';

export default {
    name: 'BicarbonateValuesList',
    components: {
        UnitDialog,
    },
    props: {
        openUnitDialog: Function,
    },

    setup() {
        const store = useRootStore();
        const descBookStores = store.deskBookStores
        const bikorbonat = computed( {
            get: () => store.sessionData.bikorbonat,
            set: ( value ) => {
                store.sessionData.bikorbonat = value;
            },
        } );

        const patientWeight = computed( {
            get: () => store.sessionData.weight,
            set: ( value ) => {
                store.sessionData.weight = value;
            },
        } );

        const volume = computed( {
            get: () => store.sessionData.volume,
            set: ( value ) => {
                store.sessionData.volume = value;
            },
        } );

        const unit = ref( store.sessionData.unit );
        const antikogulant = ref( store.sessionData.antikogulant )

        watch( () => store.sessionData.unit, ( newValue ) => {
            unit.value = newValue; // Обновляем значение в основном компоненте
        } );

        watch( () => store.sessionData.antikogulant, ( newValue ) => {
            antikogulant.value = newValue; // Обновляем значение в основном компоненте
        } );

        const unitSuffix = computed( () => {
            return unit.value === 'грамм' ? 'гр' : unit.value === 'литр' ? 'л' : '';
        } );


        return {
            descBookStores,
            unit,
            antikogulant,
            unitSuffix,
            volume,
            patientWeight,
            bikorbonat
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../css/app.scss";

.bkr-container {
    display: flex;
    gap: 20px;
    margin-bottom: 20px;
}

.bkr-container div:not(.bkr-items):nth-child(2),
.bkr-container div:not(.bkr-items):nth-child(4) {
    display: none;
}

.bkr-items {
    display: flex;
    gap: 20px;
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
