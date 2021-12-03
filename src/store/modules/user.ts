import { getToken, setToken, removeToken, getRoles, setRoles, removeRoles, getUser, setUser, removeUser } from "../../utils/auth";
import { StoreOptions } from "vuex";
import { login$ } from "../../api/login";
import { ElMessage } from 'element-plus';

const user: StoreOptions<any> = {
    state: {
        token: getToken(),
        roles: getRoles() || [],
        user: getUser() || {}
    },

    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token
        },
        SET_ROLES: (state, roles) => {
            state.roles = roles
        },
        SET_USER: (state, user) => {
            state.user = user
        }
    },

    actions: {
        // 用户登录
        async login({ commit, dispatch, state, rootState }, userInfo) {
            const { data, code, message }: any = await login$(userInfo)
            if (code < 0) {
                ElMessage.error(message);
                throw new Error(message);
            }

            const { adminToken: token, resourceKeys: roles } = data;
            const { name, avatar, adminId } = data;
            const user = { name, avatar, adminId };

            commit("SET_TOKEN", token);
            commit("SET_USER", user);
            commit("SET_ROLES", roles);
            setToken(token);
            setRoles(roles);
            setUser(user);
        },

        // 登出
        async logOut({ commit, state }) {
            // TODO: 暂时本地清除cookie，不调用接口
            // await logout().toPromise();
            commit("SET_TOKEN", null);
            commit("SET_ROLES", []);
            commit("SET_USER", {});
            removeToken();
            removeRoles();
            removeUser();
        }
    }
}

export default user