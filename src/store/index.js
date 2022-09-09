import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)
export default new Vuex.Store({
    state: {
        isFold: false,
        currentUser: {},
        tagList: [

        ],
        accessToken: null,
    },
    mutations: {
        changeFold(state) {
            state.isFold = !state.isFold;
        },
        pushTag(state, val) {
            let t = 1
            for (let i = 0; i < state.tagList.length; i++) {
                if (state.tagList[i] == val) {
                    t = 0
                }
            }
            if (t) {
                state.tagList.push(val)
            }
        },
    }
})