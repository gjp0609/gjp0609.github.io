<template>
    <div class="home">
        <h1>Hello Webpack!</h1>
        <div class="infos">
            <a href="https://github.com/gjp0609/gjp0609.github.io" target="_blank">Github</a>
            <a href="https://gjp0609.github.io/static/material-design-icons/index.html" target="_blank">Material Design Icons</a>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Home'
    };
</script>

<style lang="scss" scoped>
    .home {
        h1 {
            margin-top: 50px;
            text-align: center;
        }
        .infos {
            margin-top: 200px;
            display: flex;
            flex-direction: row;
            justify-content: space-around;
            a {
                text-decoration: none;
            }
        }
    }
</style>
