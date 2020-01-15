<template>
    <div class="index">
        <span>{{ test }}</span>
        <el-button @click="asd">qwe</el-button>
        <el-button @click="index">to index</el-button>
    </div>
</template>

<script>
    const axios = require('axios');

    export default {
        name: 'Test',
        data() {
            return {
                test: 1
            };
        },
        methods: {
            asd() {
                alert(123111);
                axios
                    .get('http://httpbin.org/get?param=test')
                    .then((resp) => {
                        console.log(resp);
                    })
                    .catch((e) => {
                        console.log(e);
                    });
            },
            index() {
                this.$router.push('/index/home');
            }
        }
    };
</script>

<style lang="scss" scoped>
    .index {
        span {
            color: #00c4a7;
        }
    }
</style>
