import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "@/views/Layout.vue";
import UserLogin from "@/views/Auth/Login/Login.vue";
import Logout from "@/views/Auth/Logout/Logout.vue";
import HomePage from "@/views/HomePage.vue";
import ModuleHomePage from "@/views/ModuleHomePage.vue";
//at first import here then add the path name component below
import customerprofile from "@/views/customerprofile/customerprofileUI.vue"
import customerProfileDeatilsUI from "@/views/customerProfileDeatils/customerProfileDeatilsUI.vue";



import NotFound from "@/views/404.vue";

Vue.use(VueRouter);

const routes = [{
        path: "/",
        redirect: {
            name: "userLogin",
        },
    },
    {
        path: "/login",
        name: "userLogin",
        component: UserLogin,
        meta: {
            requiresVisitor: true,
        },
    },
    
    {
        path: "/logout",
        name: "Logout",
        component: Logout,
        meta: {
            requiresAuth: false, // all children will need authentication too
        },
    },

    
    {
        name: "BU_UltimusNexTestProject",
        path: "/BU_Parameters",
        component: Layout,
        // meta: {
        //     requiresAuth: true, // all children will need authentication too
        // },
        children: [
            {
                path: "/home",
                name: "HomePage",
                component: HomePage,        
            },
            {
                path: "customerprofileUI",
                name: "CustomerProfile",
                component: customerprofile,  
            }, 
            {
                path: "customerProfileDeatilsUI",
                name: "customerProfileDeatils",
                component: customerProfileDeatilsUI,
        },
            
            
        ],
    },

    
];

const router = new VueRouter({
    mode: "history",
    // base: process.env.BASE_URL,
    routes,
});

export default router;