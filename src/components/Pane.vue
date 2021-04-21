<template>
    <div  class="pane-container scrollable">
        <div class="title">Employees</div>
        <div v-for="employee in managerList"  v-bind:key="employee.id" class="employees" v-show="employeeList && employee.firstName && !employee.IsManagerHasNoEmployees">
            <div class="employee" @click="SelectEmployee(employee)" :class="{'selected': employee.selected}">{{employee.firstName}}, {{employee.lastName}}</div>
            <div class="separator"></div>
            <div class="employee-of"  v-for="employeeOf in employeesOfSpecificManager"
                  :class="{'selected': employeeOf.selected}"
                  v-bind:key="employeeOf.id"
                  v-show="employee.id === employeeOf.managerId"
                  @click="SelectEmployee(employeeOf)">{{employeeOf.firstName}}, {{employeeOf.lastName}}</div>
            <div class="separator"></div>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';

    export default {
        name: "Pane",
        data() {
            return {
                employeeList: [],
                managerList: [],
                employeesOfSpecificManager: [],
            }
        },
        methods: {
            ...mapGetters(['employees']),
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
            this.employeeList = this.employees();
            console.log("this.employeeList", this.employeeList);
        },
    }
</script>

<style scoped>

    .title {
        color:  #3467ac;
        font-size: 18px;
        padding-bottom: 32px;

    }

    .pane-container {
        width: 220px;
        padding: 16px 0;
        border-right: 1px solid #3467ac;
        overflow: auto;
    }

    .employees:hover {
        cursor: pointer;
         background-color: rgba(0,121,239,.05);
     }

    .employee.selected {
        background-color: rgba(0, 121, 239, 0.1);
        font-weight: bold;
    }

    .employee-of:hover {
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
</style>