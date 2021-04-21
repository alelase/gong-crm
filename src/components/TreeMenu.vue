<template>
    <div  v-if="employee" :style="indent">

        <div class="manager-container">
            <div v-if="employee && !employee.IsManagerHasNoEmployees" class="sign">+</div>
            <div v-if="employee.IsManagerHasNoEmployees" class="sign">-</div>
            <div v-show="employee.photo" class="circle"><img class="image" :src="employee.photo" /></div>
            <div v-show="!employee.photo" class="circle">{{Initials(employee)}}</div>
            <div class="employee" @click="SelectEmployee(employee)" :class="{'selected': employee.selected}">{{employee.firstName}}, {{employee.lastName}}, {{employee.email}}</div>
            <div class="icon-edit" @click="SelectEmployee(employee)"></div>
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
                <!--<div v-if="success">Update success!</div>-->
            </div>
        </div>
        <div>
            <TreeMenu :depth="depth + 1" v-for="actualEmployee in employees" :employee="actualEmployee"  v-bind:key="actualEmployee.id" :employees="GetActualEmployees(actualEmployee) || []" :allemployees="allemployees" ></TreeMenu>
        </div>

    </div>
</template>

<script>
    //import {mapGetters} from 'vuex';
    import { UPDATE_EMPLOYEE, DELETE_EMPLOYEE } from "../store";

    export default {
        name: "TreeMenu",
        props: {
            allemployees: Array,
            employee: Object,
            employees: Array,
            depth: Number,
        },
        data() {
            return {
                managerList: [],
                employeesOfSpecificManager: [],
            }
        },
        methods: {
            GetActualEmployees(employee) {
                if(employee && employee.id) {
                    let emps = this.allemployees.filter(emp => emp.managerId == employee.id);
                    console.log("emps", emps);
                    if(!emps || emps.length == 0) {
                        employee.IsManagerHasNoEmployees = true;
                    }
                    return emps;
                }
                return [];
            },
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
                employee.selected = true;
                this.selectedEmployee=employee;
                this.employees.forEach(function(employee){
                    if(employee.selected) {
                        employee.selected = false;
                    }
                });

                employee.selected = true;
                // console.log("employee.managerId", employee.managerId);
                // if(employee && !employee.managerId) {
                //     console.log("entro?");
                //     this.employeesOfSpecificManager = this.employees().filter(emp => emp.managerId == employee.id);
                //     if(this.employeesOfSpecificManager.length === 0) {
                //         employee.IsManagerHasNoEmployees = true;
                //     }
                // }
            }
        },
        computed: {
            indent() {
                return { transform: `translate(${this.depth * 50}px)` }
            }
            // Employees() {
            //     console.log("this.employees", this.employees());
            //     if (this.employees) {
            //         return this.employees();
            //     }
            //
            //     return [];
            // },
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
        // watch: {
        //     Employees() {
        //         this.employeeList = this.employees();
        //         this.managerList = this.employees().filter(employee => !employee.managerId);
        //     }
        // },
        mounted() {
            console.log("Hola tree menu this.employee!!!!", this.employee);
        },
    }
</script>

<style scoped>
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
        display: flex;
        justify-content: center;
        align-items: center;
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