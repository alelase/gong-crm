<template>
    <!--<div class="account-container">-->
        <!--&lt;!&ndash;Account&ndash;&gt;-->
        <!--&lt;!&ndash;<div v-for="index in 100" :key="index">&ndash;&gt;-->
            <!--&lt;!&ndash;{{ index }}&ndash;&gt;-->
        <!--&lt;!&ndash;</div>&ndash;&gt;-->
        <!--&lt;!&ndash;<Body>&ndash;&gt;-->
            <!--&lt;!&ndash;<template v-slot:pane>&ndash;&gt;-->
                <!--&lt;!&ndash;<Pane></Pane>&ndash;&gt;-->
            <!--&lt;!&ndash;</template>&ndash;&gt;-->
            <!--&lt;!&ndash;<template v-slot:work>&ndash;&gt;-->
                <!--&lt;!&ndash;<WorkArea></WorkArea>&ndash;&gt;-->
            <!--&lt;!&ndash;</template>&ndash;&gt;-->
        <!---->
        <!--&lt;!&ndash;</Body>&ndash;&gt;-->
    <!--</div>-->
    <div class="account-container">
    <div  class="pane-container scrollable">
        <div class="title">Employees</div>
        <div v-for="employee in managerList"  v-bind:key="employee.id" class="employees" v-show="employeeList && employee.firstName && !employee.IsManagerHasNoEmployees">

            <div class="manager-container">
                <div v-if="!employee.IsManagerHasNoEmployees" class="sign">+</div>
                <div v-show="employee.photo" class="circle"><img class="image" :src="employee.photo" /></div>
                <div v-show="!employee.photo" class="circle">{{Initials(employee)}}</div>
                <div class="employee" @click="SelectEmployee(employee)" :class="{'selected': employee.selected}">{{employee.firstName}}, {{employee.lastName}}, {{employee.email}}</div>
                <div class="icon-edit" @click="GoEdit(employee)"></div>
                <div class="icon-delete" @click="deleteEmployee"></div>
            </div>
            <div class="editor" :class="{edit: employee.selected}">
                <div class="form">

                    <div class="login-container">
                        <div class="user-container">
                            <div class="age-container">
                                <label>First Name</label>&nbsp;
                                <input v-model="employee.firstName" type="text" placeholder="First Name"/>
                            </div>
                            <div class="age-container">
                                <label>Last Name</label>&nbsp;
                                <input v-model="employee.lastName" type="text" placeholder="Last Name"/>
                            </div>
                        </div>

                        <hr/>
                        <div class="buttons-container">
                            <div class="button-container">
                                <button @click="employee.selected=false">Cancel</button>
                            </div>
                            <div class="button-container">
                                <button @click="updateEmployee">ok</button>
                            </div>
                        </div>


                    </div>
                    <div v-if="success">Update success!</div>
                </div>
            </div>

            <!--<div class="employee-of"  v-for="employeeOf in employeesOfSpecificManager.length"-->
                 <!--:class="{'selected': employeeOf.selected}"-->
                 <!--v-bind:key="employeeOf.id"-->
                 <!--v-show="employee.id === employeeOf.managerId"-->
                 <!--@click="SelectEmployee(employeeOf)">{{employeeOf.firstName}}, {{employeeOf.lastName}},  {{employee.email}}</div>-->
            <!--<div class="separator"></div>-->

            <div class="employees-of">

                <div class="employee-of"  v-for="employeeOf in employeesOfSpecificManager"
                         :class="{'selected': employeeOf.selected}"
                         v-bind:key="employeeOf.id"
                         v-show="employee.id === employeeOf.managerId"
                         @click="SelectEmployee(employeeOf)">
                    <div class="sign">-</div>
                    <div>{{employeeOf.firstName}}, {{employeeOf.lastName}},  {{employee.email}}</div>
                </div>
                <div class="separator"></div>
            </div>

        </div>
    </div>
    </div>
</template>

<script>
    // import Body from "./Body";
    // import Pane from "./Pane";
    // import WorkArea from "./WorkArea";
    import { UPDATE_EMPLOYEE, DELETE_EMPLOYEE, GET_EMPLOYEES } from "../store";
    import {mapGetters} from 'vuex';

    export default {
        name: "Account",
        // components: {WorkArea, Pane, Body}
        data() {
            return {
                employeeList: [],
                managerList: [],
                selectedEmployee: {},
                employeesOfSpecificManager: [],
                success: false,
            }
        },
        methods: {
            ...mapGetters(['employees']),
            Initials(employee) {
                if(employee.firstName && employee.lastName) {
                    return `${employee.firstName.substr(0, 1)}, ${employee.lastName.substr(0, 1)}`;
                }
                return "N/A";
            },
            update: function () {
                this.success = false;
                const { selectedEmployee } = this;
                this.$store.dispatch(UPDATE_EMPLOYEE, { selectedEmployee }).then(() => {
                    this.success = true;
                })
            },
            GoEdit(employee) {
                employee.selected = !employee.selected;
                this.selectedEmployee=employee;
            },
            updateEmployee: function () {
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
            },
            SelectEmployee(employee) {

                this.employeeList.forEach(function(employee){
                    if(employee.selected) {
                        employee.selected = false;
                    }
                });

                employee.selected = true;
                console.log("employee.managerId", employee.managerId);
                if(!employee.managerId) {
                    console.log("entro?");
                    this.employeesOfSpecificManager = this.employees().filter(emp => emp.managerId == employee.id);
                    if(this.employeesOfSpecificManager.length === 0) {
                        employee.IsManagerHasNoEmployees = true;
                    }
                }
            }
        },
        computed: {
            Employees() {
                console.log("this.employees", this.employees());
                if (this.employees) {
                    return this.employees();
                }

                return [];
            },
            // viewsByManager() {
            //     //https://lodash.com/docs/4.17.15#chain
            //     return _.chain(this.employeeList)
            //     // Group the elements of Array based on `category` property
            //         .groupBy("category")
            //         // `key` is group's name (category), `value` is the array of objects
            //         .map((value, key) => ({ categoryName: key, data: value }))
            //         .value();
            //
            // },
        },
        watch: {
            Employees() {
                this.employeeList = this.employees();
                this.managerList = this.employees().filter(employee => !employee.managerId);
            }
        },
        mounted() {
            console.log("this.hola work area", this.employeeList);
            this.$store.dispatch(GET_EMPLOYEES).then(() => {
                //this.success = true;

                // if(!employee.managerId) {
                //     console.log("entro?");
                //     this.employeesOfSpecificManager = this.employees().filter(emp => emp.managerId == employee.id);
                //     if(this.employeesOfSpecificManager.length === 0) {
                //         employee.IsManagerHasNoEmployees = true;
                //     }
                // }
                // let i=0;
                // this.employees.forEach(emp=> {
                //     this.employeesOfSpecificManager[i] = [];
                //     this.employees.forEach(emp2=> {
                //         if(emp2.managerId == emp.id) {
                //             this.employeesOfSpecificManager[i].push(emp);
                //         }
                //     })
                // });

            })
        },
    }
</script>

<style scoped>

    .account-container {
        height: 100vh;
        display: flex;
        flex-direction: column;
        flex: 1;
        overflow: auto;
    }

    .title {
        color:  #3467ac;
        font-size: 18px;
        padding-bottom: 32px;

    }

    .pane-container {
        padding: 16px 0;
        border-right: 1px solid #3467ac;
        overflow: auto;

        display: flex;
        flex-direction: column;
        align-items: flex-start;
        padding-left: 64px;
    }

    /*.employees:hover {*/
        /*cursor: pointer;*/
        /*background-color: rgba(0,121,239,.05);*/
    /*}*/

    .employee.selected {
        background-color: rgba(0, 121, 239, 0.1);
        font-weight: bold;
    }

    .employee-of:hover {
        padding-left: 16px;
        cursor: pointer;
        background-color: rgba(0,121,239,.05);
    }

    .employee-of.selected {
        background-color: rgba(0, 121, 249, 0.4);
        font-weight: bold;
    }

    .employee {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 40px;
        text-align: left;
        font-size: 14px;
        text-transform:uppercase;

    }

    .separator {
        display: flex;
        border-bottom: 1px solid silver;
    }

    .manager-container {
        display: flex;
        align-items: center;
    }

    .manager-container .sign{
        font-size: 24px;
        padding-right: 8px;
    }

    .icon-edit {
        background-image: url(https://cdn4.iconfinder.com/data/icons/software-menu-icons/256/SoftwareIcons-68-512.png);
        background-repeat: no-repeat;
        background-size: 24px 24px;
        width: 24px;
        height: 24px;
        cursor: pointer;
    }

    .icon-delete {
        background-image: url(https://icons-for-free.com/iconfiles/png/512/delete+remove+trash+trash+bin+trash+can+icon-1320073117929397588.png);
        background-repeat: no-repeat;
        background-size: 24px 24px;
        width: 24px;
        height: 24px;
        cursor: pointer;
    }

    .circle {
        border-radius: 50%;
        overflow: hidden;
        width: 48px;
        height: 48px;
        border: 2px purple solid;
    }

    .image {
        width: 48px;
        height: 48px;
    }

    .editor {
        display: none;
        border: 1px solid blue;
        border-radius: 4px;
        padding: 8px;
        margin: 8px;
    }

    .editor.edit {
        display: flex;
    }

    .buttons-container {
        display: flex;
        justify-content: flex-end;
    }

    .button-container {
        padding: 16px;
    }

    .user-container {
        display: flex;
    }

    .age-container {
        padding-left: 8px;
    }

    .employees-of {
        display: flex;
        flex-direction: column;
    }

    .employee-of {
        display: flex;
    }
</style>