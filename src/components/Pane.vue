<template>
    <div  class="pane-container scrollable">
        <div class="title">Employees</div>
        <div v-for="employee in employeeList"  v-bind:key="employee.id" class="employees" v-show="employeeList">
            <div class="employee" @click="SelectEmployee(employee)" :class="{'selected': employee.selected}">{{employee.firstName}}, {{employee.lastName}}</div>
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
                employeeList: []
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
                console.log("employee", employee);
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
        },
        watch: {
            Employees() {
                this.employeeList = this.employees();
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