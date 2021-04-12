import Vue from "vue";
import Router from "vue-router";
import Account from "@/components/Account";
import Login from "@/components/Login";
import store from "./store";

Vue.use(Router);

const ifNotAuthenticated = (to, from, next) => {
    if (!store.getters.isAuthenticated) {
        next();
        return;
    }
    next("/");
};

const ifAuthenticated = (to, from, next) => {
    if (store.getters.isAuthenticated) {
        console.log("store.getters.isAuthenticated", store.getters.isAuthenticated);
        next("/account");
        return;
    }
    next("/login");
};

export default new Router({
    mode: "history",
    routes: [
        {
            path: "/",
            name: "Deafault",
            component: Account,
        },
        {
            path: "/account",
            name: "Account",
            component: Account,
            beforeEnter: ifAuthenticated
        },
        {
            path: "/login",
            name: "Login",
            component: Login,
            beforeEnter: ifNotAuthenticated
        }
    ]
});