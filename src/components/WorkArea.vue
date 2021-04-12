<template>
    <div class="work-area-container">
        <div  v-if="this.selectedEmployee && this.selectedEmployee.id">
            <div class="title">
                {{selectedEmployee.firstName}}, {{selectedEmployee.lastName}}
            </div>
            <div class="title">
                {{selectedEmployee.email}}
            </div>
            <form class="login" @submit.prevent="update">

                <div class="login-container">
                    <div class="title-login">
                        <h2><img class="image" :src="selectedEmployee.photo" /></h2>
                    </div>
                    <div class="password-container">
                        <label>Password</label>&nbsp;
                        <input v-model="password" type="password" placeholder="Password"/>
                    </div>
                    <div class="age-container">
                        <label>Age</label>&nbsp;
                        <input v-model="selectedEmployee.age" type="text" placeholder="age"/>
                    </div>
                    <hr/>
                    <div class="button-container">
                        <button type="submit">Update Employee Age</button>
                    </div>


                </div>

            </form>
        </div>

        <div v-else class="title">
            Select Employee for the Left Pane
        </div>
    </div>

</template>

<script>
    import { UPDATE_EMPLOYEE } from "../store";
    import {mapGetters} from 'vuex';

    export default {
        name: "WorkArea",
        data() {
            return {
                selectedEmployee: {},
                password: "",
                age:"",
            }
        },
        methods: {
            ...mapGetters(['employees']),
            update: function () {
                const { selectedEmployee } = this;
                this.$store.dispatch(UPDATE_EMPLOYEE, { selectedEmployee }).then(() => {

                })
            }
        },
        computed: {
            SelectedEmployees() {
                console.log("this.employees", this.employees());
                if (this.employees) {
                    return this.employees();
                }

                return [];
            },
        },
        watch: {
            SelectedEmployees: {
                // This will let Vue know to look inside the array
                deep: true,

                // We have to move our method to a handler field
                handler() {
                    return this.selectedEmployee = this.employees().find(employee => employee.selected);
                }
            },
        },
        mounted() {
            console.log("this.hola work area", this.employeeList);
        },
    }
</script>

<style scoped>

    .work-area-container {
        flex: 1;
        width: 100%;
        padding: 16px;
        overflow: auto;
        display: flex;
        flex-direction: column;
    }

    .title {
        font-size: 24px;
    }

    .image {
        width: 200px;
    }

    .password-container {
        display: none;
    }
</style>