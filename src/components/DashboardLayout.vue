<!-- @format -->

 <template>
<div class="dashboard">
 <v-navigation-drawer v-model="drawer" class="fullheight" width="256" app>
 <v-list-item>
 <v-list-item-content>
 <v-list-item-title class="title"> Natural Beauty Center</v-list-item-title>
 <v-list-item-subtitle> Salon Kecantikan </v-list-item-subtitle>
 </v-list-item-content>
 </v-list-item>

 <v-divider></v-divider>

 <v-list dense nav>
 <v-list-item
 v-for="item in items"
 :key="item.title"
 link
 tag="router-link"
 :to="item.to"
 >
 <v-list-item-content>
 <v-list-item-title>{{ item.title }}</v-list-item-title>
 </v-list-item-content>
 </v-list-item>
 </v-list>
 </v-navigation-drawer>
 <v-app-bar app fixed height="75px">
 <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
 <VSpacer />
 <v-toolbar-items>
 <v-btn text router><v-icon>mdi-power</v-icon></v-btn>
 </v-toolbar-items>
 </v-app-bar>
 <div class="fullheight pa-5">
 <router-view></router-view>
 </div>
 </div>
 </template>
 <script>
 export default {
 name: "Dashboard",
 data() {
 return {
 drawer: true,
 items: [
{ title: "Dashboard", to: "/dashboard" },
{ title: "Login", to: "/login" },
{ title: "Register", to: "/register" },
{ title: "Customer", to: "/customers" },
{ title: "Perawatan", to: "/perawatans" },
{ title: "Produk", to: "/produks" },
{ title: "Promo", to: "/promos" },
 {title: "Role", to: "/roles"},
 
 {title: "Karyawan", to: "/karyawans"},

 ],
 };
 },
 };
 </script>

 <style scoped>
 .fullheight {
 min-height: 100vh !important;
 }
 .router {
 text-decoration: none; 
 color: black;
 }
 </style> 