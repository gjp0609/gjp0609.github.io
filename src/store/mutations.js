import { SET_COUNT } from './mutation-types';

export default {
    [SET_COUNT](state, payload) {
        state.count = payload.count;
    }
};
