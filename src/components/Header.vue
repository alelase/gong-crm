<template>
    <div class="header-container">
        <div class="logo-container"><img src="@/assets/gong_logo.svg" /></div>
        <div class="menu">
            <div class="title">GONG CRM</div>
            <div v-show="authenticated">
                <span class="logged-user">Hi! Albertito Geniales discontes</span>
                <!--<span class="link" @click="logout()">Logout</span>-->
                <router-link v-bind:to="'login'" @click.native="logout">Logout</router-link>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';
    import { AUTH_LOGOUT } from "../store";
    export default {
        name: "Header",
        data() {
            return {
                // authenticated: false
            }
        },
        methods: {
            ...mapGetters(['isAuthenticated']),
            logout() {
                this.$store.dispatch(AUTH_LOGOUT).then(() => {
                    //this.$router.push('/login');
                    console.log("logged out!");
                })

                //this.$store.dispatch(AUTH_LOGOUT).then(() => this.$router.push("/login"));
            },
        },
        computed: {
           authenticated() {
               console.log("this.isAuthenticated", this.isAuthenticated());
               return this.isAuthenticated();
           }
        },
    }
</script>

<style scoped>

    .header-container {
        height: 48px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 16px;
        border-bottom: 1px solid #3467ac;
        background-color: silver;
    }

    .logo-container img {
        height: 48px;
        transition: height linear .2s;
    }

    .logo-container img:hover {
        height: 96px;

    }

    .menu {
        display: flex;
        flex-direction: column;
        height: 48px;
    }
    .title {
        font-size: 24px;
        color: #3467ac;
        margin-left: auto;
    }

    .menu .link{
        color: blue;
        text-decoration: underline;
        cursor: pointer;
    }

    .menu .logged-user {
        color: white;
        padding-right: 8px;
    }
</style>