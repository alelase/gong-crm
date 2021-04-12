<template>
    <div class="body-container">
        <slot name="pane"></slot>
        <slot name="work"></slot>
    </div>
</template>

<script>
    export default {
        name: "Body"
    }
</script>

<style scoped>
    .body-container {
        flex: 1;
        display: flex;
        overflow: hidden;
    }
</style>