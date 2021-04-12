<template>
    <div class="account-container">
        Account
        <div v-for="index in 100" :key="index">
            {{ index }}
        </div>
    </div>
</template>

<script>
    export default {
        name: "Account"
    }
</script>

<style scoped>

    .account-container {
        display: flex;
        flex-direction: column;
        flex: 1;
        padding: 16px;
        overflow: auto;
    }
</style>