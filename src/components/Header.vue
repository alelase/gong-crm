<template>
    <div class="header-container">
        <div class="logo-container"><img src="@/assets/gong_logo.svg" /></div>
        <div class="menu">
            <div class="title">GONG CRM</div>
            <div v-show="authenticated">
                <span>Hi! Albertito</span>
                <span>Logout</span>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';

    export default {
        name: "Header",
        data() {
            return {
                // authenticated: false
            }
        },
        methods: {
            ...mapGetters(['isAuthenticated'])
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

    .title {
        font-size: 24px;
        color: #3467ac;
    }
</style>