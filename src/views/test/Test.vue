<template>
    <div class="index">
        <el-button @click="index">to index</el-button>
        <el-button @click="incrementCount">increment</el-button>
        <span>{{ count }}</span>
    </div>
</template>

<script lang="ts">
    import { INCREMENT_COUNT, store } from '../../store';
    import { defineComponent } from 'vue';

    export default defineComponent({
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
            incrementCount() {
                store.commit(INCREMENT_COUNT);
            },
            index() {
                console.log('test action');
                this.$router.push('/index/home');
            }
        }
    });
</script>

<style lang="scss" scoped>
    .index {
        span {
            color: #00c4a7;
        }
    }
</style>
