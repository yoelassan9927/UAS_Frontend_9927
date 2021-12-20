<!-- @format -->

 <template>
 <v-main class="list">
 <h3 class="text-h3 font-weight-medium mb-5"> Table Customer </h3>

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


 <v-data-table :headers="headers" :items="customers" :search="search">
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
 <span class="headline">{{ formTitle }} Customer</span>
 </v-card-title>
 <v-card-text>
 <v-container>
 <v-text-field
 v-model="form.nama_customer"
 label="Nama Customer"
 required
 ></v-text-field>

 <v-text-field
 v-model="form.noTelp_customer"
 label="No Telepon"
 required
 ></v-text-field>

<v-text-field
 v-model="form.alamat_customer"
 label="Alamat Customer"
 required
 ></v-text-field>

 <v-text-field
 v-model="form.jenisKelamin_customer"
 label="Jenis Kelamin Customer"
 required
 ></v-text-field>

 <v-text-field
 v-model="form.tglLahir_customer"
 label="Tanggal Lahir Customer"
 required
 ></v-text-field>

 <v-text-field
 v-model="form.email_customer"
 label="Email Customer"
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
 Anda yakin ingin menghapus customer ini?
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
 { text: "Nama Customer",
 align: "start",
 sortable: true,
 value: "nama_customer" },
 { text: "Nomor Customer", value: "noTelp_customer" },
  { text: "Alamat Customer", value: "alamat_customer" },
   { text: "Tanggal Lahir Customer", value: "tglLahir_customer" },
    { text: "Jenis Kelamin Customer", value: "jenisKelamin_customer" },
 { text: "Email Customer", value: "email_customer" },
 { text: "Actions", value: "actions" },
 ],


 customer: new FormData,
 customers: [],
 form: {
 nama_customer: null,
 noTelp_customer: null,
  email_customer: null,
  alamat_customer: null,
  jenisKelamin_customer: null,
  tglLahir_customer: null,
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
 var url = this.$api + '/customer'
 this.$http.get(url, {
 headers: {
 'Authorization': 'Bearer ' + localStorage.getItem('token')
 } 
 }).then(response => {
 this.customers = response.data.data
 })
 },
 //simpan data produk
 save() {
 this.customer.append('nama_customer', this.form.nama_customer);
 this.customer.append('noTelp_customer', this.form.noTelp_customer);
 this.customer.append(' email_customer', this.form.email_customer);
  this.customer.append(' alamat_customer', this.form.alamat_customer);
   this.customer.append(' jenisKelamin_customer', this.form.jenisKelamin_customer);
    this.customer.append(' tglLahir_customer', this.form.tglLahir_customer);

 var url = this.$api + '/customer/'
 this.load = true
 this.$http.post(url, this.customer, {
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
 nama_customer: this.form.nama_customer,
  noTelp_customer: this.form.noTelp_customer,
 email_customer: this.form.email_customer,
 alamat_customer: this.form.alamat_customer,
 jenisKelamin_customer: this.form.jenisKelamin_customer,
 tglLahir_customer: this.form.tglLahir_customer,


 }
 var url = this.$api + '/customer/' + this.editId;
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
 var url = this.$api + '/customer/' + this.deleteId;
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
 this.form.nama_customer = item.nama_customer;
 this.form.noTelp_customer = item.noTelp_customer;
 this.form.email_customer = item.email_customer;
 this.form.alamat_customer = item.alamat_customer;
 this.form.jenisKelamin_customer = item.jenisKelamin_customer;
 this.form.tglLahir_customer = item.tglLahir_customer;
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
 nama_customer: null,
 noTelp_customer: null,
email_customer: null,
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