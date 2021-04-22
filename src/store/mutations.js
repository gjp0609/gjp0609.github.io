import { SET_COUNT, SET_TOKEN } from './mutation-types';

export default {
    [SET_COUNT](state, payload) {
        state.count = payload.count;
    },
    [SET_TOKEN](state, payload) {
        state.token = payload.token;
    }
};
