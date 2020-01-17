<template>
    <div class="index">
        <router-view></router-view>
    </div>
</template>

<script>
    export default { name: 'Index' };
</script>

<style lang="scss" scoped>
    .index {
        height: 100%;
        .invalid-route {
            text-align: center;
            a {
                text-decoration: none;
            }
        }
    }
</style>
