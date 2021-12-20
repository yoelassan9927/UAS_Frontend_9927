<!-- @format -->

 <template>
 <v-main class="list">
 <h3 class="text-h3 font-weight-medium mb-5"> Table Karyawan </h3>

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


 <v-data-table :headers="headers" :items="users" :search="search">
 <template v-slot:[`item.actions`]="{ item }">
 <v-btn small class="mr-2" @click="editHandler(item)">
 edit
 </v-btn>
 <v-btn small @click="deleteHandler(item.id)">
 delete
 </v-btn>
 </template> 
 </v-data-table>
 </v-card>

 <v-dialog v-model="dialog" persistent max-width="600px">
 <v-card>
 <v-card-title>
 <span class="headline">{{ formTitle }} Karyawan</span>
 </v-card-title>
 <v-card-text>
 <v-container>
 <v-text-field
 v-model="form.name"
 label="Nama Karyawan"
 required
 ></v-text-field>

 <v-text-field
 v-model="form.email"
 label="Email Karyawan"
 required
 ></v-text-field>

 <v-text-field
 v-model="form.password"
 label="Password"
 required
 ></v-text-field>




 </v-container>
 </v-card-text>
 <v-card-actions>
 <v-spacer></v-spacer>
 <v-btn color="blue darken-1" text @click="cancel">
 Cancel
 </v-btn>
 <v-btn color="blue darken-1" text @click="setForm">
 Save
 </v-btn>
 </v-card-actions>
 </v-card>
 </v-dialog>

 <v-dialog v-model="dialogConfirm" persistent max-width="400px">
 <v-card>
 <v-card-title>
 <span class="headline">warning!</span>
 </v-card-title>
 <v-card-text>
 Anda yakin ingin menonaktifkan akun ini?
 </v-card-text>
 <v-card-actions>
 <v-spacer></v-spacer>
 <v-btn color="blue darken-1" text @click="dialogConfirm = false">
 Cancel
 </v-btn>
 <v-btn color="blue darken-1" text @click="deleteData"> 
 Delete
 </v-btn>
 </v-card-actions>
 </v-card>
 </v-dialog>

 <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom>
 {{error_message}}
 </v-snackbar>
 </v-main>
 </template>
 <script>
 export default {
 name: "List",
 data() {
 return {
 inputType: 'Tambah',
 load: false,
 snackbar: false,
 error_message: '',
 color: '',
 search: null,
 dialog: false,
 dialogConfirm: false,
 headers: [
 { text: "Nama Karyawan",
 align: "start",
 sortable: true,
 value: "name" },
 { text: "Email", value: "email" },
 { text: "Jenis Kelamin", value: "jenisKelamin_karyawan" },
 { text: "Nomor Telepon", value: "noTelp_karyawan" },
 { text: "Actions", value: "actions" },
 ],


 user: new FormData,
 users: [],
 form: {
 name: null,
 email: null,
  password: null,
   jenisKelamin_karyawan: null,
    noTelp_karyawan: null,
 },
 deleteId: '',
 editId: ''
 };
 },
 methods: {
 setForm() {
 if (this.inputType === 'Tambah') {
 this.save()
 } else {
 this.update()
 }
 },
 //read data product
 readData() {
 var url = this.$api + '/user'
 this.$http.get(url, {
 headers: {
 'Authorization': 'Bearer ' + localStorage.getItem('token')
 } 
 }).then(response => {
 this.users = response.data.data
 })
 },
 //simpan data produk
 save() {
 this.user.append('name', this.form.name);
 this.user.append('email', this.form.email);
 this.user.append(' password', this.form.password);



 var url = this.$api + '/user/'
 this.load = true
 this.$http.post(url, this.user, {
 headers: {
 'Authorization': 'Bearer ' + localStorage.getItem('token')
 }
 }).then(response => {
 this.error_message=response.data.message;
 this.color="green"
 this.snackbar=true;
 this.load = false;
 this.close();
 this.readData(); //mengambil data
 this.resetForm();
 }).catch(error => {
 this.error_message=error.response.data.message;
 this.color="red"
 this.snackbar=true;
 this.load = false;
 })
 },
 //ubah data produk
 update() {
 let newData = {
 name: this.form.name,
  email: this.form.email,


 }
 var url = this.$api + '/user/' + this.editId;
 this.load = true
 this.$http.put(url, newData, {
 headers: {
 'Authorization': 'Bearer ' + localStorage.getItem('token')
 }
 }).then(response => {
 this.error_message=response.data.message;
 this.color="green"
 this.snackbar=true;
 this.load = false;
 this.close();
 this.readData(); //mengambil data
 this.resetForm();
 this.inputType = 'Tambah';
 }).catch(error => {
 this.error_message=error.response.data.message;
 this.color="red"
 this.snackbar=true;
 this.load = false;
 }) 
 },
 //hapus data produk
 deleteData() {

 //mengahapus data
 var url = this.$api + '/user/' + this.deleteId;
 //data dihapus berdasarkan id
 this.$http.delete(url, {
 headers: {
 'Authorization': 'Bearer ' + localStorage.getItem('token')
 }
 }).then(response => {
 this.error_message=response.data.message;
 this.color="green"
 this.snackbar=true;
 this.load = false;
 this.close();
 this.readData(); //mengambil data
 this.resetForm();
 this.inputType = 'Tambah';
 }).catch(error => {
 this.error_message=error.response.data.message;
 this.color="red"
 this.snackbar=true;
 this.load = false;
 })
 },
 editHandler(item){
 this.inputType = 'Ubah';
 this.editId = item.id;
 this.form.name = item.name;
 this.form.email = item.email;
 this.form.jenisKelamin_karyawan = item.jenisKelamin_karyawan;
  this.form.noTelp_karyawan = item.noTelp_karyawan;

 this.dialog = true;
 },
 deleteHandler(id){
 this.deleteId = id;
 this.dialogConfirm = true;
 },
 close() {
 this.dialog = false
 this.inputType = 'Tambah';
 },
 cancel() {
 this.resetForm();
 this.readData();
 this.dialog = false;
 this.inputType = 'Tambah';
 },
 resetForm() {
 this.form = {
 name: null,
 email: null,
password: null,
jenisKelamin_karyawan: null,
noTelp_karyawan: null,
 stok: null,
 };
 },
 },
 computed: {
 formTitle() {
 return this.inputType 
 },
 },
 mounted() {
 this.readData();
 },
 };
 </script> 