<template>
    <div class="account-container">
    <div  class="pane-container scrollable" v-if="managerList">
        <div class="title">Employees</div>
        <TreeMenu v-for="employee in managerList" v-bind:key="employee.id" :employees="GetActualEmployees(employee) || []"  :employee="employee" :depth="0" :allemployees="managerList"></TreeMenu>
    </div>
    </div>
</template>

<script>
    // import Body from "./Body";
    // import Pane from "./Pane";
    // import WorkArea from "./WorkArea";
    import { UPDATE_EMPLOYEE, DELETE_EMPLOYEE, GET_EMPLOYEES } from "../store";
    import {mapGetters} from 'vuex';
    import TreeMenu from "./TreeMenu";

    export default {
        name: "Account",
        components: {TreeMenu},
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
            GetActualEmployees(employee) {

                if(employee && employee.id) {
                    let emps = this.employeeList.filter(emp => emp.managerId == employee.id);
                    console.log("emps", emps);
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
            SelectEmployee() {

                this.employeeList.forEach(function(employee){
                    if(employee.selected) {
                        employee.selected = false;
                    }
                });
            }
        },
        mounted() {
            console.log("this.hola work area", this.employeeList);
            this.$store.dispatch(GET_EMPLOYEES).then(() => {
                //this.success = true;
                //console.log("this.employees", this.employees());
                this.employeeList = this.employees();
                console.log("this.employeeList", this.employeeList);
                this.managerList = this.employeeList.filter(employee => !employee.managerId);
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

</style>