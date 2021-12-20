<!-- @format -->

 <template>
 <v-main class="list">
 <h3 class="text-h3 font-weight-medium mb-5"> Table Perawatan </h3>

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


 <v-data-table :headers="headers" :items="perawatans" :search="search">
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
 <span class="headline">{{ formTitle }} Perawatan</span>
 </v-card-title>
 <v-card-text>
 <v-container>
 <v-text-field
 v-model="form.nama_perawatan"
 label="Nama Perawatan"
 required
 ></v-text-field>

 <v-text-field
 v-model="form.jenis_perawatan"
 label="Jenis Perawatan"
 required
 ></v-text-field>

<v-text-field
 v-model="form.harga_perawatan"
 label="Harga Perawatan"
 required
 ></v-text-field>

 <v-text-field
 v-model="form.deskripsi_perawatan"
 label="Deskripsi Perawatan"
 required
 ></v-text-field>

 <v-text-field
 v-model="form.potongan_poin"
 label="Potongan Poin"
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
 Anda yakin ingin menghapus perawatan ini?
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
 { text: "Nama Perawatan",
 align: "start",
 sortable: true,
 value: "nama_perawatan" },
 { text: "Nomor Perawatan", value: "jenis_perawatan" },
  { text: "Harga Perawatan", value: "harga_perawatan" },
   { text: "Potongan Poin", value: "potongan_poin" },
    { text: "Deskripsi Perawatan", value: "deskripsi_perawatan" },
 { text: "Actions", value: "actions" },
 ],


 perawatan: new FormData,
 perawatans: [],
 form: {
 nama_perawatan: null,
 jenis_perawatan: null,
  harga_perawatan: null,
  deskripsi_perawatan: null,
  potongan_poin: null,
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
 var url = this.$api + '/perawatan'
 this.$http.get(url, {
 headers: {
 'Authorization': 'Bearer ' + localStorage.getItem('token')
 } 
 }).then(response => {
 this.perawatans = response.data.data
 })
 },
 //simpan data produk
 save() {
 this.perawatan.append('nama_perawatan', this.form.nama_perawatan);
 this.perawatan.append('jenis_perawatan', this.form.jenis_perawatan);
  this.perawatan.append(' harga_perawatan', this.form.harga_perawatan);
   this.perawatan.append(' deskripsi_perawatan', this.form.deskripsi_perawatan);
    this.perawatan.append(' potongan_poin', this.form.potongan_poin);

 var url = this.$api + '/perawatan/'
 this.load = true
 this.$http.post(url, this.perawatan, {
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
 nama_perawatan: this.form.nama_perawatan,
  jenis_perawatan: this.form.jenis_perawatan,
 harga_perawatan: this.form.harga_perawatan,
 deskripsi_perawatan: this.form.deskripsi_perawatan,
 potongan_poin: this.form.potongan_poin,


 }
 var url = this.$api + '/perawatan/' + this.editId;
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
 var url = this.$api + '/perawatan/' + this.deleteId;
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
 this.form.nama_perawatan = item.nama_perawatan;
 this.form.jenis_perawatan = item.jenis_perawatan;
 this.form.harga_perawatan = item.harga_perawatan;
 this.form.deskripsi_perawatan = item.deskripsi_perawatan;
 this.form.potongan_poin = item.potongan_poin;
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
 nama_perawatan: null,
 jenis_perawatan: null,
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