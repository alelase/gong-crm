<template>
    <div class="work-area-container">
        <div class="title" v-if="this.selectedEmployee && this.selectedEmployee.id">
            {{selectedEmployee.firstName}}, {{selectedEmployee.lastName}}
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';

    export default {
        name: "WorkArea",
        data() {
            return {
                selectedEmployee: {}
            }
        },
        methods: {
            ...mapGetters(['employees']),
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
</style>