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
            },
            addCount() {
                this.$store.commit(SET_COUNT, { count: this.$store.count + 1 });
            },
            index() {
                console.log('test action');
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
