<template>
    <v-main class="list">
        <h3 class="text-h3 font-weight-medium mb-5">To Do List UGD</h3>

        <v-card>
            <v-card-title>
                <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Search"
                    single-line
                    hide-details
                ></v-text-field>

                <v-spacer></v-spacer>

                <v-btn color="success" dark @click="dialog = true">
                    tambah
                </v-btn>
            </v-card-title>

            <v-data-table 
                :headers="headers" 
                :items="todos"
                :search="search">

                <template v-slot:[`item.priority`]="{ item }">
                    <td>
                        <v-card v-if="item.priority == 'Penting'" style="border-color: red; color: red; width: fit-content;" outlined>
                            {{ item.priority }}
                        </v-card>
                        <v-card v-else-if="item.priority == 'Biasa'" style="border-color: blue; color: blue; width: fit-content;" outlined>
                            {{ item.priority }}
                        </v-card>
                        <v-card v-else outlined style="border-color: green; color: green; width: fit-content;">
                            {{ item.priority }}
                        </v-card>
                    </td>
                </template>

                <template v-slot:[`item.actions`]="{ item }">

                     <v-btn small class="mr-2" @click="editItem(item)">edit</v-btn>
                     <v-btn small class="mr-2" @click="deleteItem(item)">delete</v-btn>

                </template>
            </v-data-table>
        </v-card>

        <v-dialog v-model="dialog" persistent max-width="600px">
            <v-card>
                <v-card-title>
                    <span class="headline" 
                        v-if="adding == true" >
                           Form Todo - Add
                    </span>
                    <span class="headline" 
                        v-else>
                           Form Todo - Edit
                    </span>
                </v-card-title>

                <v-card-text>
                    <v-container>
                        <v-text-field
                            v-model="formTodo.task"
                            label="Task"
                            required
                            autofocus
                        ></v-text-field>

                        <v-select
                            v-model="formTodo.priority"
                            :items="['Penting', 'Biasa', 'Tidak penting']"
                            label="Priority"
                            required
                        ></v-select>

                        <v-textarea
                            v-model="formTodo.note"
                            label="Note"
                            required
                        ></v-textarea>
                    </v-container>
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    
                    <v-btn color="blue" text @click="cancel">
                        Cancel
                    </v-btn>

                    <v-btn v-if="adding == true" 
                        color="blue" 
                        text 
                        @click="save">
                        Save
                    </v-btn>

                    <v-btn v-else 
                        color="blue" 
                        text 
                        @click="edit(formTodo)">
                        Save
                    </v-btn>

                </v-card-actions>
            </v-card>
        </v-dialog>

                    
        <v-dialog v-model="dialogdel" persistent max-width="400px">
            <v-card>
                <v-card-title>
                    <span class="headline">
                        Anda Yakin ingin menghapus?
                    </span>
                </v-card-title>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    
                    <v-btn color="green" text @click="cancel">
                        Tidak
                    </v-btn>

                    <v-btn color="red" text @click="confirmdelete">
                        Ya
                    </v-btn>

                </v-card-actions>

            </v-card>
        </v-dialog>

                    
        <v-dialog v-model="dialognote" persistent max-width="400px">
            <v-card>
                <v-card-title>
                    <span class="headline">
                        {{detail.task}}
                    </span>
                </v-card-title>
                
                <v-card-text>
                    <v-container>
                        <v-card v-if="detail.priority == 'Penting'" style="border-color: red; color: red; width: fit-content;" outlined>
                            {{detail.priority}}
                        </v-card>
                        <v-card v-else-if="detail.priority == 'Biasa'" style="border-color: blue; color: blue; width: fit-content;" outlined>
                            {{detail.priority}}
                        </v-card>
                        <v-card v-else outlined style="border-color: green; color: green; width: fit-content;">
                            {{detail.priority}}
                        </v-card>
                        {{detail.note}}
                    </v-container>
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="red" text @click="cancel">
                        Close
                    </v-btn>
                </v-card-actions>

            </v-card>
        </v-dialog>

    </v-main>
</template>
<script>

import {
    mdiPencil,
    mdiDelete,
    mdiTextBoxSearchOutline,
} from '@mdi/js'

export default {
    name: "List",

    data() {
        return {
            search: null,
            searchp: "All Priority",
            adding: true,
            edititem: null,
            dialog: false,
            dialogdel: false,
            dialognote: false,
    
            icons: {
                mdiPencil,
                mdiDelete,
                mdiTextBoxSearchOutline,
            },

            filters: {
                search: '',
                priority: '',
            },

            headers: [
                {
                    text: "Task",
                    align: "start",
                    sortable: true,
                    value: "task",
                },
                
                { 
                    text: "Priority",
                    field: "priority", 
                    value: "priority" 
                },
                { 
                    text: "Actions", 
                    value: "actions", 
                    sortable: false,
                },
            ],

            todos: [
                {
                    task: "bernafas",
                    priority: "Penting",
            
                },
                {
                    task: "nongkrong",
                    priority: "Tidak penting",
               
                },
                {
                    task: "masak",
                    priority: "Biasa",
               
                },
            ],

            formTodo: {
                task: null,
                priority: null,
              
            },

            detail: {
                task: null,
                priority: null,
             
            }
        };
    },

    methods: {
        save() {
            this.todos.push(this.formTodo);
            this.cancel();
        },

        cancel() {
            this.resetForm();
            this.dialog = false;
            this.edititem = null;
            this.adding = true;
            this.dialogdel = false;
            this.dialognote = false;
        },

        deleteItem(item) {
            this.dialogdel = true;
            this.edititem = item;
        },

        confirmdelete() {
            this.todos.splice(this.todos.indexOf(this.edititem), 1);
            this.dialogdel = false;
        },

        editItem(item) {
            this.adding = false;
            this.formTodo = {
                task: item.task,
                priority: item.priority,
            };
            this.dialog = true;
            this.edititem = item;
        },

       

        edit(formTodo) {
            this.edititem.task = formTodo.task;
            this.edititem.priority = formTodo.priority;
            this.cancel();
        },
        
        resetForm() {
            this.formTodo = {
                task: null,
                priority: null,
            };
        },
    },
};
</script>

<style scoped>
.icnote{color: plum !important;}
.pencil{color: lightblue !important;}
.bin{color: lightcoral !important;}
</style>