<template>
  <div class="recipient">
    <div v-for="icon in icons" :key="icon.id" class="icons-items">
      <div style="display: flex;">
        <q-icon :name="icon.img" size="24px" class="recipient-icon"/>
        <p class="recipient-lable">{{ icon.name }}-</p>
      </div>

      <div style="display: flex; margin-right: 20px;">
        <p v-for="item in prescription" class="lable">
          {{ item && item.bigCategory === icon.bigCategory ? (item.name || 'No name') + '/' : '' }}

        </p>
      </div>
    </div>
  </div>
</template>
<script>

import {icons} from "../constants/icons-items"
import {prescription} from "../stores/arrayStore"
import {watch} from "vue"

export default {
  name: 'Reciept',
  setup() {
    watch(() => prescription, (newArray, oldArray) => {
    });

    return {prescription, icons};
  },
};
</script>

<style lang="scss" scoped>
@import "../css/app.scss";

.recipient {
  display: flex;
  width: 50%;
  border: 1px solid gray;
  flex-wrap: wrap;
}

.icons-items {
  display: flex;
  align-items: center;
  padding: 10px;
}

.recipient-lable {
  font-weight: 600;
}

.recipient-icon {
  margin-right: 10px;

}
</style>
