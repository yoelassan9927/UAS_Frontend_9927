<!-- @format -->

 <template>
 <v-main class="list">
 <h3 class="text-h3 font-weight-medium mb-5"> Table Produk </h3>

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


 <v-data-table :headers="headers" :items="produks" :search="search">
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
 <span class="headline">{{ formTitle }} Produk</span>
 </v-card-title>
 <v-card-text>
 <v-container>
 <v-text-field
 v-model="form.nama_produk"
 label="Nama Produk"
 required
 ></v-text-field>


<v-text-field
 v-model="form.harga_produk"
 label="Harga Produk"
 required
 ></v-text-field>

 
 <v-text-field
 v-model="form.berat_produk"
 label="Berat Produk"
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
 Anda yakin ingin menghapus produk ini?
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
 { text: "Nama Produk",
 align: "start",
 sortable: true,
 value: "nama_produk" },
  { text: "Harga Produk", value: "harga_produk" },
 { text: "Berat Produk", value: "berat_produk" },
 { text: "Actions", value: "actions" },
 ],


 produk: new FormData,
 produks: [],
 form: {
 nama_produk: null,
  berat_produk: null,
  harga_produk: null,
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
 var url = this.$api + '/produk'
 this.$http.get(url, {
 headers: {
 'Authorization': 'Bearer ' + localStorage.getItem('token')
 } 
 }).then(response => {
 this.produks = response.data.data
 })
 },
 //simpan data produk
 save() {
 this.produk.append('nama_produk', this.form.nama_produk);
 this.produk.append(' berat_produk', this.form.berat_produk);
  this.produk.append(' harga_produk', this.form.harga_produk);

 var url = this.$api + '/produk/'
 this.load = true
 this.$http.post(url, this.produk, {
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
 nama_produk: this.form.nama_produk,
 berat_produk: this.form.berat_produk,
 harga_produk: this.form.harga_produk,


 }
 var url = this.$api + '/produk/' + this.editId;
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
 var url = this.$api + '/produk/' + this.deleteId;
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
 this.form.nama_produk = item.nama_produk;
 this.form.berat_produk = item.berat_produk;
 this.form.harga_produk = item.harga_produk;
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
 nama_produk: null,
berat_produk: null,
harga_produk: null,
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