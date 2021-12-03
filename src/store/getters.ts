import { GetterTree } from "vuex";

const getters: GetterTree<any, any> = {
    token: state => state.user.token,
    roles: state => state.user.roles,
    user: state => state.user.user,
    count: state => state.app.count,
}

export default getters