<template>
    <div class="index">
        <div v-if="invalidRoute" class="invalid-route">
            <h2>Page Not Found</h2>
            <a :href="indexUrl">Go to index</a>
        </div>
        <router-view v-else></router-view>
    </div>
</template>

<script>
    export default {
        name: 'Index',
        data() {
            return {
                indexUrl: window.location.href.split('#')[0]
            };
        },
        computed: {
            invalidRoute() {
                return !this.$route.matched || this.$route.matched.length === 0;
            }
        }
    };
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
