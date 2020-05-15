import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueRouter from 'vue-router';
import Index from './Index.vue';
import router from './router';
import store from './store';

require('../static/material-design-icons/material-design-icons.css');
require('./styles/base.scss');
require('@fortawesome/fontawesome-free/css/all.min.css');
require('@fortawesome/fontawesome-free/js/all.min');

Vue.use(ElementUI);
Vue.use(VueRouter);

(() => new Vue({ el: '#app', router, store, render: (h) => h(Index) }))();
