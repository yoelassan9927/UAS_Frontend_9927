<!-- @format -->

 <template>
 <v-main class="list">
 <h3 class="text-h3 font-weight-medium mb-5"> Table Promo </h3>

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


 <v-data-table :headers="headers" :items="promos" :search="search">
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
 <span class="headline">{{ formTitle }} Promo</span>
 </v-card-title>
 <v-card-text>
 <v-container>
 <v-text-field
 v-model="form.kode_promo"
 label="Kode Promo"
 required
 ></v-text-field>

 <v-text-field
 v-model="form.jenis_promo"
 label="Jenis Promo"
 required
 ></v-text-field>

<v-text-field
 v-model="form.tglAktif_promo"
 label="Tanggal Aktif Promo"
 required
 ></v-text-field>

 <v-text-field
 v-model="form.keterangan_promo"
 label="Keterangan Promo"
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
 Anda yakin ingin menghapus promo ini?
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
 { text: "Kode Promo",
 align: "start",
 sortable: true,
 value: "kode_promo" },
 { text: "Nomor Promo", value: "jenis_promo" },
  { text: "Tanggal Aktif Promo", value: "tglAktif_promo" },
    { text: "Keterangan Promo", value: "keterangan_promo" },
 { text: "Actions", value: "actions" },
 ],


 promo: new FormData,
 promos: [],
 form: {
 kode_promo: null,
 jenis_promo: null,
  tglAktif_promo: null,
  keterangan_promo: null,
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
 var url = this.$api + '/promo'
 this.$http.get(url, {
 headers: {
 'Authorization': 'Bearer ' + localStorage.getItem('token')
 } 
 }).then(response => {
 this.promos = response.data.data
 })
 },
 //simpan data produk
 save() {
 this.promo.append('kode_promo', this.form.kode_promo);
 this.promo.append('jenis_promo', this.form.jenis_promo);
  this.promo.append(' tglAktif_promo', this.form.tglAktif_promo);
   this.promo.append(' keterangan_promo', this.form.keterangan_promo);

 var url = this.$api + '/promo/'
 this.load = true
 this.$http.post(url, this.promo, {
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
 kode_promo: this.form.kode_promo,
  jenis_promo: this.form.jenis_promo,
 tglAktif_promo: this.form.tglAktif_promo,
 keterangan_promo: this.form.keterangan_promo,

 }
 var url = this.$api + '/promo/' + this.editId;
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
 var url = this.$api + '/promo/' + this.deleteId;
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
 this.form.kode_promo = item.kode_promo;
 this.form.jenis_promo = item.jenis_promo;
 this.form.tglAktif_promo = item.tglAktif_promo;
 this.form.keterangan_promo = item.keterangan_promo;
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
 kode_promo: null,
 jenis_promo: null,
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