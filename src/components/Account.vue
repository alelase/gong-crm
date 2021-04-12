<template>
    <div class="account-container">
        <!--Account-->
        <!--<div v-for="index in 100" :key="index">-->
            <!--{{ index }}-->
        <!--</div>-->
        <Body>
        <template v-slot:pane>
            <Pane></Pane>
        </template>
        <template v-slot:work>
            <WorkArea></WorkArea>
        </template>
        </Body>
    </div>
</template>

<script>
    import Body from "./Body";
    import Pane from "./Pane";
    import WorkArea from "./WorkArea";

    export default {
        name: "Account",
        components: {WorkArea, Pane, Body}
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
</style>