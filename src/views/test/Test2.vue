<template>
    <div class="index">
        <el-button @click="index">to index</el-button>
        <el-button @click="decreaseCount">decrease</el-button>
        <span>{{ count }}</span>
    </div>
</template>

<script>
    import { DECREASE_COUNT, store } from '../../store';

    export default {
        name: 'Test',
        data() {
            return {
                test: 1
            };
        },
        computed: {
            count() {
                return store.state.count;
            }
        },
        mounted() {
            this.test = store.state.count;
        },
        methods: {
            decreaseCount() {
                store.commit(DECREASE_COUNT);
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
