import App from './App.vue';

const Vue = require('vue');
require('element-ui');
(() =>
    new Vue({
        el: '#app',
        render: (h) => h(App)
    }))();
