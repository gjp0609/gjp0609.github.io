<template>
    <div class="single-wrapper">
        <div class="nav">
            Click to open in new tab: <a :href="url" target="_blank">{{ url }}</a>
        </div>
        <iframe :src="url"></iframe>
    </div>
</template>

<script>
    export default {
        name: 'Wrapper',
        data() {
            return {
                url: undefined
            };
        },
        watch: {
            $route() {
                this.get();
            }
        },
        mounted() {
            this.get();
        },
        methods: {
            get() {
                let path = this.$route.path;
                let href = location.href;
                href = href.substr(0, href.indexOf('#'));
                if (path.indexOf('/') === 0 && href.lastIndexOf('/') === href.length - 1) {
                    path = path.substr(1);
                }
                this.url = href + path;
            }
        }
    };
</script>

<style lang="scss" scoped>
    .single-wrapper {
        display: flex;
        flex-direction: column;
        flex: 1;
        .nav {
            margin-bottom: 1rem;
        }
        iframe {
            flex: 1;
            border: none;
        }
    }
</style>
