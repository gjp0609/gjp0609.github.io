<template>
    <div class="single-wrapper">
        <div class="nav">
            Click to open in new tab: <a :href="url" target="_blank">{{ url }}</a>
        </div>
        <iframe class="shadow" :src="url"></iframe>
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
            a {
                color: unset;
                text-decoration: none;
            }
        }
        .shadow {
            box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 20px rgba(0, 0, 0, 0.1) inset;
        }
        .shadow::before,
        .shadow::after {
            content: '';
            position: absolute;
            z-index: -1;
        }
        .shadow::before,
        .shadow::after {
            content: '';
            position: absolute;
            z-index: -1;
            bottom: 15px;
            left: 10px;
            width: 50%;
            height: 20%;
        }
        .shadow::before,
        .shadow::after {
            content: '';
            position: absolute;
            z-index: -1;
            bottom: 15px;
            left: 10px;
            width: 50%;
            height: 20%;
            box-shadow: 0 15px 10px rgba(0, 0, 0, 0.7);
            transform: rotate(-3deg);
        }
        .shadow::after {
            right: 10px;
            left: auto;
            transform: rotate(3deg);
        }
        iframe {
            flex: 1;
            border: none;
        }
    }
</style>
