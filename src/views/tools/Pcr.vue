<template>
    <div>
        {{ text }}
        <el-input v-model="param" />
        <el-button @click="testFunc">Test</el-button>
    </div>
</template>

<script>
    import service from 'service';
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
                service.get('/test/get?s=' + _this.param).then((res) => {
                    _this.text = res;
                });
            }
        }
    };
</script>

<style lang="scss" scoped></style>
