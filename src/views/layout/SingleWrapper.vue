<template>
    <div class="single-wrapper">
        <div class="nav">
            Click to open in new tab: <a :href="url" target="_blank">{{ url }}</a>
        </div>
        <iframe class="shadow" :src="url"></iframe>
    </div>
</template>

<script lang="ts" setup>
    import { ref, watch, onMounted } from 'vue';
    import { useRoute } from 'vue-router';

    const $route = useRoute();
    const url = ref('');
    watch(
        () => $route.path,
        async (path) => {
            render(path);
        }
    );

    onMounted(() => {
        render($route.path);
    });

    function render(path: string) {
        let href = location.href;
        href = href.substring(0, href.indexOf('#'));
        if (path.indexOf('/') === 0 && href.lastIndexOf('/') === href.length - 1) {
            path = path.substring(1);
        }
        url.value = href + path;
    }
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
