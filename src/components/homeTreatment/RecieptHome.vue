<template>
    <div class="recipient">
        <p class="lable" style="margin-bottom: 20px;">Лечение на дому</p>
        <div v-for="(item, index) in homeArray" :key="index" class="reciept-home">
            <span class="text">{{ item.drugsHome }} {{ item.methodRouteHome }} {{ item.drugDosesHome }} {{
                item.freguencyHome }} утром и
                вечером c {{ item.startDateHome }} по {{ item.endDateHome }} {{ item.quantityHome }} дней</span>
        </div>
    </div>
</template>

<script>


import { homeArray } from "../../stores/arrayStore";
export default {
    name: 'RecieptHome',
    setup() {
        return { homeArray };
    },
};
</script>

<style lang="scss" scoped>
@import "../../css/app.scss";

.reciept-home {
    display: flex;
    width: 50%;
    height: 200px;
    border: 1px solid gray;
    flex-wrap: wrap;
    padding: 20px;

    .text {
        font-size: 18px;
        line-height: 40px;
        font-weight: 500;
    }
}
</style>
