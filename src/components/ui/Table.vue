<template>
    <div class="q-pa-md">
        <p class="label" style="margin-bottom: 20px;">Список назначений после сеансов</p>
        <q-table flat bordered :rows=afterArray :columns=columns row-key="name" hide-bottom />
    </div>
</template>

<script>
import { ref } from 'vue';
import { afterArray } from "stores/arrayStore";

export default {
    setup() {
        const columns = [
            { name: 'Лекарственный_препарат', align: 'center', label: 'Лекарственный препарат', field: 'drugs', },
            { name: 'Путь_приема', label: 'Путь приема', field: 'methodRoute', },
            { name: 'Дозировка', label: 'Дозировка', field: 'drugDoses' },
            { name: 'Начало_приема', label: 'Начало приема', field: 'startDate' },
            { name: 'Конец_приема', label: 'Конец приема', field: 'endDate' },
            { name: 'Номер_сеанса', label: 'Номер сеанса', field: 'selectedDays', },
            { name: 'Дней', label: 'Дней', field: 'quantity', },


        ];

        return {
            afterArray,
            columns,
        };
    },
};
</script>
