<template>
    <div class="super-login-container">
        <form class="login" @submit.prevent="login">

            <div class="login-container">
                <div class="title-login">
                    <h2>Please login</h2>
                </div>
                <div class="user-container">
                    <label>User name</label>
                    <input required v-model="username" type="text" placeholder="enter your email"/>
                </div>
                <div class="password-container">
                    <label>Password</label>
                    <input required v-model="password" type="password" placeholder="Password"/>
                </div>
                <hr/>
                <div class="button-container">
                    <div v-show="status==='error'" class="error">login error!</div>
                    <button type="submit">Login</button>
                </div>


            </div>

        </form>
    </div>
</template>

<script>
    import { AUTH_REQUEST } from "../store";
    import {mapGetters} from 'vuex';

    export default {
        name: "Login",
        data() {
            return {
                //Note! Placed an exisiting user only for conveninece in order to achieve fast login to debug!.
                username: "anthony.xiouping@xtreet.tvl",
                password: "mllv9n0x"
            };
        },
        methods: {
            ...mapGetters(['authStatus']),
            login: function () {
                const { username, password } = this;
                console.log("username", username);
                this.$store.dispatch(AUTH_REQUEST, { username, password }).then(() => {
                    this.$router.push('/account');
                })
            }
        },
        computed: {
            status() {
                console.log("this.authStatus", this.authStatus());
                return this.authStatus();
            }
        },
    }
</script>

<style scoped>

    .super-login-container {
        display: flex;
        flex: 1;
        align-items: center;
        justify-content: center;
    }

    .login-container {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 32px;
        border: 1px solid silver;
        border-radius: 4px;
        width: 360px;
    }

    .login-container .user-container, .login-container .password-container {
        padding: 16px 48px;
        flex: 1;
        display: flex;
        justify-content: space-between;
    }

    .login-container .title-login {
        display: flex;
        justify-content: flex-start;
    }


    .login-container .button-container {
        padding-right: 48px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }

    .login-container .button-container .error {
        padding-right: 64px;
        color: crimson;
    }


</style>