<template>
    <div class="numbers-container">
        <div style="margin-bottom: 20px;">
            <p class="lable">Номера сеансов:</p>
        </div>

        <div class="numbers">
            <q-btn class="number-btn" v-for="day in numberOfDays" :key="day" @click="toggleDay(day)"
                :class="{ selected: selectedDays.includes(day) }">
                {{ day }}
            </q-btn>

        </div>
    </div>
</template>

<script>
import { useRootStore } from 'stores/store';
import { watch } from "vue"

export default {
    name: 'NumberOfDaysComponent',
    setup() {
        const { numberOfDays, toggleDay, selectedDays, } = useRootStore();

        watch( selectedDays, ( newSelectedDays ) => {

        } );




        return {
            numberOfDays,
            toggleDay,
            selectedDays,
            // setSelectedDays,
        };
    },
};
</script>




<style lang="scss" scoped>
@import "../../css/app";

.numbers-container {
    margin-bottom: 40px;
}

.numbers {
    display: flex;
    gap: 25px;
}

.number-btn {
    border: 1px solid gray;
    width: 50px;
    height: 50px;
    font-size: 18px;
}

.selected {
    background-color: #01c9c8;
    color: white;
    font-size: 18px;
}
</style>
