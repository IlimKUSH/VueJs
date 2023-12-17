<template>
    <q-dialog v-model="modelValue">
        <q-card>
            <q-card-section>
                <h6 class="title">{{ store.catalogName }}</h6>

                <q-btn label="Закрыть" @click="closeDialog" class="close-btn" />

                <div class="inputs">
                    <q-input v-model="searchText" label="Поиск позиции по первым символам" outlined />
                    <q-btn icon="search" />
                </div>

                <div class="inputs">
                    <q-input v-model="newEntry" label="Добавить новую запись" outlined />
                    <q-btn icon="add" @click="addEntryFromButton(newEntry)" />
                </div>

                <q-list>
                    <q-item v-for="entry in filteredItems" :key="entry.id" clickable class="book-items">
                        <p class="title-items">{{ entry.name }}</p>
                        <q-btn flat icon="delete" @click="removeEntry(entry.id)" />
                        <q-btn flat icon="keyboard_arrow_right" @click="handleItemClick(entry)" />

                    </q-item>
                </q-list>
            </q-card-section>
        </q-card>
    </q-dialog>
</template>

<script>
import { defineComponent, ref, watch, computed } from 'vue';
import { prescription } from '../stores/arrayStore';
import { useRootStore } from "../stores/store"

export default defineComponent( {
    props: {
        modelValue: Boolean,
        store: Object
    },

    setup( props, { emit } ) {
        const closeDialog = () => {
            emit( 'update:modelValue', false );
        };
        const mainStore = useRootStore()
        const items = ref( props.store.array );
        const newEntry = ref( "" );
        const searchText = ref( "" )

        const filteredItems = computed( () => {
            if ( !searchText.value ) {
                return items.value;
            }

            const searchTerm = searchText.value.toLowerCase();
            return items.value.filter( ( entry ) =>
                entry.name.toLowerCase().startsWith( searchTerm )
            );
        } );

        const addEntryFromButton = ( newEntryValue ) => {
            const newEntryData = {
                id: Date.now().toString(),
                name: newEntryValue,
            };

            props.store.addEntry( newEntryData );

            newEntry.value = '';
        };

        const removeEntry = ( id ) => {
            props.store.removeEntryById( id );
        };

        watch( () => props.store.array, ( newArray ) => {
            items.value = newArray;
        } );

        const addToPrescription = ( selectedEntryId, ) => {
            props.store.addToPrescription( selectedEntryId );
        };


        const handleItemClick = ( entry ) => {
            switch ( entry.group ) {
                case '1':
                    addToPrescription( entry.id );
                    break;
                case '2':
                    mainStore.sessionDataDoses.drugs = entry.name;
                    break;
                case '3':
                    mainStore.sessionHomeDoses.drugsHome = entry.name;
                    break;
                default:

                    break;
            }
        };


        const update = mainStore.updateItem

        return {
            closeDialog,
            items,
            addEntryFromButton,
            removeEntry,
            newEntry,
            searchText,
            filteredItems,
            addToPrescription,
            handleItemClick,
            mainStore,
            update
        };
    },
} );
</script>

<style lang="scss" scoped>
@import "../css/app.scss";

.inputs {
    display: flex;
    gap: 10px;
    margin-bottom: 10px;
}

.book-items {
    display: flex;
    justify-content: flex-start;
    align-items: center;
}

.close-btn {
    margin-bottom: 20px;
    border: 1px solid gray
}

.title {
    margin-bottom: 20px;
}

.title-items {
    width: 200px;
}
</style>
