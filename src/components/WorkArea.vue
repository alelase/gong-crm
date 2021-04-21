<template>
    <div class="work-area-container">
        <div  v-if="this.selectedEmployee && this.selectedEmployee.id">
            <div class="title">
                {{selectedEmployee.firstName}}, {{selectedEmployee.lastName}}
            </div>
            <div class="title">
                {{selectedEmployee.email}}
            </div>
            <div class="form">

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
                    <div class="buttons-container">
                        <div class="button-container">
                            <button @click="update">Update Employee Age</button>
                        </div>
                        <div class="button-container">
                            <button @click="deleteEmployee">Delete Employee Age</button>
                        </div>
                    </div>


                </div>
                <div v-if="success">Update success!</div>
            </div>
        </div>

        <div v-else class="title">
            Select Employee for the Left Pane
        </div>
    </div>

</template>

<script>
    import { UPDATE_EMPLOYEE, DELETE_EMPLOYEE, GET_EMPLOYEES } from "../store";
    import {mapGetters} from 'vuex';

    export default {
        name: "WorkArea",
        data() {
            return {
                selectedEmployee: {},
                password: "",
                age:"",
                success: false,
            }
        },
        methods: {
            ...mapGetters(['employees']),
            update: function () {
                this.success = false;
                const { selectedEmployee } = this;
                this.$store.dispatch(UPDATE_EMPLOYEE, { selectedEmployee }).then(() => {
                    this.success = true;
                })
            },
            deleteEmployee: function () {
                this.success = false;
                const { selectedEmployee } = this;
                selectedEmployee.age = "";
                this.$store.dispatch(DELETE_EMPLOYEE, { selectedEmployee }).then(() => {
                    this.success = true;
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
                    this.success = false;
                    return this.selectedEmployee = this.employees().find(employee => employee.selected);
                }
            },
        },
        mounted() {
            console.log("this.hola work area", this.employeeList);
            this.$store.dispatch(GET_EMPLOYEES).then(() => {
                this.success = true;
            })
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

    .buttons-container {
        display: flex;
        justify-content: center;
    }

    .buttons-container .button-container{
        padding: 16px;
    }

</style>