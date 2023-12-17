
<template>
    <div class="dates">
        <div>
            <div style="margin-bottom: 20px;">
                <p class="label">Начало приема</p>
            </div>
            <q-btn v-model="startDate" class="btn">
                {{ startDate || "DD-MM-YYYY" }}
                <q-icon name="event" class="date-icon">
                    <q-popup-proxy>
                        <q-date v-model="startDate" mask="DD-MM-YYYY" minimal></q-date>
                    </q-popup-proxy> </q-icon>
            </q-btn>
        </div>

        <div>
            <div style="margin-bottom: 20px;">
                <p class="label">Конец приема</p>
            </div>
            <q-btn v-model="endDate" class="btn">
                {{ endDate || "DD-MM-YYYY" }}
                <q-icon name="event" class="date-icon">
                    <q-popup-proxy>
                        <q-date v-model="endDate" mask="DD-MM-YYYY" minimal></q-date>
                    </q-popup-proxy> </q-icon>
            </q-btn>
        </div>

        <div v-if="!selectedDaysProp" class="quantity-days">
            <p class="label">Количество дней <span class="quantity">{{ getDaysDifference(startDate, endDate) }}</span></p>
        </div>

        <div v-if="selectedDaysProp" class="quantity-days">
            <p class="label">Количество сеансов <span class="quantity">{{ selectedDaysLength }}</span></p>
        </div>

    </div>
</template>

<script>
import { ref, computed, watch, watchEffect } from 'vue';
import { useRootStore } from 'stores/store';

export default {
    name: "Dates",
    props: {
        startDateProp: {
            type: String,
            required: true,
        },
        endDateProp: {
            type: String,
            required: true,
        },
        selectedDaysProp: {
            type: Array,

        },
    },

    setup( props, { emit } ) {
        const startDate = ref( props.startDateProp );
        const endDate = ref( props.endDateProp );
        const selectedDays = ref( props.selectedDaysProp );

        const store = useRootStore()

        watch( [ startDate, endDate, selectedDays ], ( [ newStartDate, newEndDate, newSelectedDays ] ) => {
            emit( 'updateStartDate', newStartDate );
            emit( 'updateEndDate', newEndDate );
            emit( 'updateSelectedDats', newSelectedDays );
        } );



        const selectedDaysLength = computed( () => {
            return selectedDays.value.length;
        } );

        function getDaysDifference( startDate, endDate ) {
            // Проверяем, есть ли обе даты
            if ( !startDate || !endDate ) {
                return 0;
            }

            // Преобразуем строки в объекты Date
            const start = convertToValidDateFormat( startDate );
            const end = convertToValidDateFormat( endDate );

            // Разница в миллисекундах
            const timeDifference = end.getTime() - start.getTime();

            // Преобразуем миллисекунды в дни
            const daysDifference = Math.round( timeDifference / ( 1000 * 60 * 60 * 24 ) );

            store.sessionHomeDoses.quantityHome = daysDifference
            return daysDifference;
        }

        function convertToValidDateFormat( dateString ) {
            const parts = dateString.split( '-' );
            // Преобразуем строки в числа и индексы месяца уменьшаем на 1, так как месяцы в JavaScript начинаются с 0
            const formattedDate = new Date( parts[ 2 ], parts[ 1 ] - 1, parts[ 0 ] );
            return formattedDate;
        }





        return {
            store,
            startDate,
            endDate,
            selectedDays,
            selectedDaysLength,
            getDaysDifference,

        };
    }
};
</script>

<style lang="scss" scoped>
@import "../../css/app";

.dates {
    display: flex;
    gap: 40px;
    margin-bottom: 20px;
}

.date-icon {
    padding-left: 20px;
    cursor: pointer;
}

.quantity-days {
    display: flex;
    align-items: flex-end;
}

.quantity {
    color: #01c9c8;
}
</style>
