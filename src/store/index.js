import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)
export default new Vuex.Store({
    state: {
        isFold: false,
        tagList: [

        ]
    },
    mutations: {
        changeFold(state){
            console.log('123');
            state.isFold = !state.isFold;
        },
        pushTag(state, val){
            let t = 1
            for(let i = 0; i < state.tagList.length; i++){
                if(state.tagList[i] == val){
                    t = 0
                }
            }
            if(t){
                state.tagList.push(val)
            }
        }
    }
})