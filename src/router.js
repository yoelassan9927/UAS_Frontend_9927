import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
function importComponent(path) {
 return () => import(`./components/${path}.vue`)
}
Vue.use(VueRouter);

const router = new VueRouter({
    mode: "history",
    routes: [{
         path: "/",
         component: importComponent('DashboardLayout'),
         children: [
            //Dashboard
            {
               path: "/dashboard",
               name: "Dashboard",
               meta: {title: 'Dashboard'},
               component: importComponent('Dashboard'),
            },
            // Products
            {
                path: "/customers",
                name: "Customers",
                meta: {title: 'Customers'},
                component: importComponent('DataMaster/Customers'),
            },
            {
               path: "/karyawans",
               name: "Karyawans",
               meta: {title: 'Karyawans'},
               component: importComponent('DataMaster/Karyawans'),
           },
           {
            path: "/produks",
            name: "Produks",
            meta: {title: 'Produks'},
            component: importComponent('DataMaster/Produks'),
        },
            {
               path: "/perawatans",
               name: "Perawatans",
               meta: {title: 'Perawatans'},
               component: importComponent('DataMaster/Perawatans'),
           },
           {
            path: "/promos",
            name: "Promos",
            meta: {title: 'Promos'},
            component: importComponent('DataMaster/Promos'),
        },
           {
            path: "/mejas",
            name: "Mejas",
            meta: {title: 'Mejas'},
            component: importComponent('DataMaster/Mejas'),
        },
        {
         path: "/roles",
         name: "Roles",
         meta: {title: 'Roles'},
         component: importComponent('DataMaster/Roles'),
     },
            {
               path: "/users",
               name: "User",
               meta: {title: 'User'},
               component: importComponent('User'),
           },
         ]
   },
      // Login
   {
      path: "/login",
      name: "login",
      meta: {title: 'Login'},
   component: importComponent('Login'),
   },

   {
      path: "/register",
      name: "register",
      meta: {title: 'Register'},
   component: importComponent('Register'),
   },
   {
      path: '*',
      redirect: '/'
 },
 ],
});

//Mengset Judul
router.beforeEach((to, from, next)=> {
   document.title = to.meta.title
   next()
});
export default router;