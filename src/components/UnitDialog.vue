<template>
    <q-dialog v-model="modelValue">
        <q-card class="container-card">
            <div class="title-container">
                <p class="title-book">Справочник {{ naming }}</p>
            </div>

            <div v-for="entry in items">
                <q-item style="padding-left: 10px;" :key="entry.id" clickable
                    @click="handleClick(entry.group, entry.name, entry.category)">
                    {{ entry.name }}
                </q-item>
            </div>

        </q-card>
    </q-dialog>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { useRootStore } from "../stores/store";

export default defineComponent( {
    props: {
        modelValue: Boolean,
        store: Object
    },

    setup( props, { emit } ) {
        const closeDialog = () => {
            emit( 'update:modelValue', false );
        };
        const items = ref( props.store.array );
        const naming = ref( props.store.catalogName );
        const store = useRootStore();

        function handleClick( group, entryName, category ) {
            switch ( group ) {
                case '1':
                    handleUnitSelection( entryName, category, store.sessionData );
                    break;
                case '2':
                    handleUnitSelection( entryName, category, store.sessionDataDoses );
                    break;
                case '3':
                    handleUnitSelection( entryName, category, store.sessionHomeDoses );
                    break;
                default:
                    break;
            }

            closeDialog();
        }

        function handleUnitSelection( entryName, category, target ) {
            target[ category ] = entryName;
        }

        return {
            closeDialog,
            items,
            naming,
            handleClick
        };
    },
} );
</script>

<style lang="scss" scoped>
.title-container {
    background-color: gray;
    padding: 20px;
    margin-bottom: 20px;

    .title-book {
        color: white;
        font-weight: 600;
        font-size: 18px;
    }
}
</style>
