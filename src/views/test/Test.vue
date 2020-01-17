<template>
    <div class="index">
        <span>{{ test }}</span>
        <el-button @click="asd">qwe</el-button>
        <el-button @click="index">to index</el-button>
        <el-button @click="addCount">Add</el-button>
    </div>
</template>

<script>
    import { SET_COUNT } from '../../store/mutation-types';

    // const axios = require('axios');

    export default {
        name: 'Test',
        data() {
            return {
                test: 1
            };
        },
        methods: {
            asd() {
                console.log(this.$store.state.count);
                this.$message(this.$store.state.count);
                // axios
                //     .get('http://httpbin.org/get?param=test')
                //     .then((resp) => {
                //         console.log(resp);
                //     })
                //     .catch((e) => {
                //         console.log(e);
                //     });
            },
            addCount() {
                this.$store.commit(SET_COUNT, { count: this.$store.count + 1 });
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
