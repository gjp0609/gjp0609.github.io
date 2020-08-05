import Vuex from 'vuex';
import Vue from 'vue';
Vue.use(Vuex);
import mutations from './mutations.js';

export default new Vuex.Store({
    state: {
        count: 0
    },
    mutations: mutations
});
