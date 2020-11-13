<template>
 <v-main class="list">
 <h3 class="text-h3 font-weight-medium mb-5">To Do List</h3>
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
 Tambah
 </v-btn>
 </v-card-title>

 <v-data-table :headers="headers" :items="todos" :search="search">
 <template v-slot:[`item.actions`]="{ item }">

 <v-btn small class="mr-2" @click="editItem(item)">
 edit
 </v-btn>

 <v-btn small @click="deleteItem(item)">
 delete
 </v-btn>

 </template>
 </v-data-table>
 </v-card>

 <v-dialog v-model="dialog" persistent max-width="600px">
 <v-card>
 <v-card-title>
 <span class="headline"
 v-if="adding == true">
 form form Todo - Add
</span>

<span class = "headline"
v-else>
Form Todo - edit
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
 <v-btn color="blue darken-1" text @click="cancel">
 Cancel
 </v-btn>

 <v-btn v-if="adding == true"
    volor="blue darken-1"
    text@click="save">
    Save
</v-btn>

<v-btn v-else 
    color="blue darken-1" 
    text 
    @click="edit(formTodo)">
    Save
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
 adding: true,
 dialog: false,
 headers: [
 {
 text: "Task",
 align: "start",
 sortable: true,
 value: "task",
 },
 { text: "Priority", value: "priority" },
 { text: "Note", value: "note" },
 { text: "Actions", value: "actions" },
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
 },
 cancel() {
 this.resetForm();
 this.dialog = false;
 this.editItem = null;
 this.adding = true;
 },

 deleteItem(item) {
     this.todos.splice(this.todos.indexOf(item), 1);
 },

 editItem(formTodo){
     this.editItem.task = formTodo.task;
     this.editItem.note = formTodo.note;
     this.cancel();
 },
 resetForm() {
 this.formTodo = {
 task: null,
 priority: null,
 note: null,
 };
 },
},
};
</script>