import { InjectionKey } from 'vue';
import { createStore, Store } from 'vuex';

export interface State {
    count: number;
    token: string;
}

export const key: InjectionKey<Store<State>> = Symbol();

export const INCREMENT_COUNT = 'INCREMENT_COUNT';
export const DECREASE_COUNT = 'DECREASE_COUNT';
export const SET_TOKEN = 'SET_TOKEN';

export const store = createStore<State>({
    state() {
        return {
            count: 0,
            token: ''
        };
    },
    mutations: {
        [INCREMENT_COUNT](state) {
            state.count++;
        },
        [DECREASE_COUNT](state) {
            state.count--;
        },
        [SET_TOKEN](state, payload) {
            state.token = payload.token;
        }
    }
});
