<template>
    <div class="header-container">
        <div class="title">GONG CRM</div>
        <div class="logo-container"><img src="@/assets/gong_logo.svg" /></div>
    </div>
</template>

<script>
    export default {
        name: "Header"
    }
</script>

<style scoped>

    .header-container {
        height: 48px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 16px;
        border-bottom: 1px solid #3467ac;
        background-color: silver;
    }

    .logo-container img {
        height: 48px;
        transition: height linear .2s;
    }

    .logo-container img:hover {
        height: 96px;

    }

    .title {
        font-size: 24px;
        color: #3467ac;
    }
</style>