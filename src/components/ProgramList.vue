<template>
    <div class="program">
        <q-item class="lable">Программа аппарата</q-item>
        <div class="buttons">
            <q-btn class="btn" v-for="program in programsList" :key="program.id" flat @click="chooseProgram(program.name)"
                :class="{ active: program.name === selectedProgram }">
                {{ program.name }}
            </q-btn>
        </div>

    </div>
</template>

<script>

import { useRootStore } from 'src/stores/store';
import { ref } from "vue";
import { programs } from '../constants/item-program';

export default {
    name: 'ProgramList',
    setup() {

        const programsList = ref( programs );
        const selectedProgram = ref( null );
        const store = useRootStore();

        const chooseProgram = ( programName ) => {
            selectedProgram.value = programName;
            store.selectProgram( programName );
        };

        return {
            programsList,
            selectedProgram,
            chooseProgram
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../css/app.scss";

.program {
    margin-bottom: 20px;
}

.buttons {
    display: flex;
    gap: 2%;
}
</style>
