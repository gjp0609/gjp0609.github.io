<template>
    <div>
        {{ text }}
        <el-input v-model="param" />
        <el-button @click="testFunc">Test</el-button>
    </div>
</template>

<script>
    const axios = require('axios');
    const url = 'https://www.onysakura.com';
    export default {
        name: 'Xml',
        data() {
            return {
                param: '',
                text: ''
            };
        },
        computed: {},
        mounted() {},
        methods: {
            testFunc() {
                let _this = this;
                axios.get(url + '/test/get?s=' + _this.param).then((res) => {
                    _this.text = res;
                });
            }
        }
    };
</script>

<style lang="scss" scoped></style>
