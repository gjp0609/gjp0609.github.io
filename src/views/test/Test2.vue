<template>
    <div class="index">
        <el-button @click="index">to index</el-button>
        <el-button @click="minusCount">Minus</el-button>
        <span>{{ count }}</span>
    </div>
</template>

<script>
    export default {
        name: 'Test',
        data() {
            return {
                test: 1
            };
        },
        computed: {
            count() {
                return this.$store.state.count;
            }
        },
        mounted() {
            this.test = this.$store.state.count;
        },
        methods: {
            minusCount() {
                this.$store.state.count = this.$store.state.count - 1;
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
