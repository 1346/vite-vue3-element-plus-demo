import { StoreOptions } from "vuex";

const app: StoreOptions<any> = {
    state() {
        return {
            count: 0
        }
    },
    mutations: {
        INCREMENT(state: any) {
            state.count++
        }
    },
    actions: {
        increment(context) {
            context.commit('increment')
        }
    }
}

export default app