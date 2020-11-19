<template>
    <v-main class="list">
        <h3 class="text-h3 font-weight-medium mb-5">To Do List Tugas</h3>

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
                 <v-btn color="warning" dark @click="history = true">
                ToDo Selesai
                </v-btn>

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
                <template v-slot:[`item.checkbox`]="{ item }">
          <input type="checkbox" @change="checking($event, item)">
       </template>
            </v-data-table>
        </v-card>
        <br>
   <v-card>
        <ul v-for="(data, index) in check" :key="index">
            <li>
                {{ data.task }}
            </li>
        </ul>
        <v-card-title>
        <v-btn v-if="check.length" @click="deleteAll()">Hapus Semua</v-btn>
        </v-card-title>
    </v-card>

        <v-dialog v-model="history" >

        <v-card>
            <h3 class="text-h3 font-weight-medium mb-5">Finished ToDo List</h3>
            <v-card-title>
                <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Search"
                    single-line
                ></v-text-field>
                <v-spacer></v-spacer>
            </v-card-title>

            <v-data-table :headers="headers2" :items="ftodos" :search="search">
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
            </v-data-table>

        </v-card>
    </v-dialog>

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


    </v-main>
</template>
<script>


export default {
    name: "List",

    data() {
        return {
            search: null,
            searchp: "All Priority",
            adding: true,
            edititem: null,
            check: [],
            checkbox: false,
            history: false,
            dialog: false,
            dialogdel: false,
            dialognote: false,
    

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
                    text: "Note",
                    field: "note",
                    value: "note"
                },
                
                { 
                    text: "Actions", 
                    value: "actions", 
                    sortable: false,
                },

                { text: "", value: "checkbox"},
            ],

            headers2: [
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
                    text: "Note",
                    field: "note",
                    value: "note"
                },
                ],

                  ftodos: [
        
                ],

            todos: [
                {
                    task: "bernafas",
                    priority: "Penting",
                    note: "huffttt",
            
                },
                {
                    task: "nongkrong",
                    priority: "Tidak penting",
                    note: "bersama tman2",
               
                },
                {
                    task: "masak",
                    priority: "Biasa",
                    note: "masak air 500ml",
               
                },
            ],

            formTodo: {
                task: null,
                priority: null,
                note: null,
              
            },
        };
    },

    methods: {
        save() {
            this.todos.push(this.formTodo);
            this.resetForm();
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
            this.ftodos.push(this.edititem);
            this.todos.splice(this.todos.indexOf(this.edititem), 1);
            this.edititem = null;
            this.dialogdel = false;
        },

        editItem(item) {
            this.adding = false;
            this.formTodo = {
                task: item.task,
                priority: item.priority,
                note: item.note,
            };
            this.dialog = true;
            this.edititem = item;
        },

       

        edit(formTodo) {
            this.edititem.task = formTodo.task;
            this.edititem.priority = formTodo.priority;
            this.edititem.note = formTodo.note;
            this.cancel();
        },
        
        resetForm() {
            this.formTodo = {
                task: null,
                priority: null,
                note: null,
            };
        },

        deleteAll() {
      var i  ;
        

      
      for(i in this.check){
          this.ftodos.push(this.check[i])
        this.todos.splice(this.check[i], 1)
      }
      this.check = []
   },


   checking(event, item) {
       this.edititem= item;
      if (event.target.checked){
          this.check.push(item)
      } else {
        this.check.splice(this.check.indexOf(item), 1)
      }
   }
    },
};
</script>