import router from "./router";
import store from "./store";
import NProgress from "nprogress";
import 'nprogress/nprogress.css';

NProgress.configure({ showSpinner: false })

function hasPermission(roles: any, permissionRoles: any) {
    if (roles.indexOf('admin') > 0) return true;
    if (!permissionRoles) return true;
    return roles.some((role: any) => permissionRoles.indexOf(role) >= 0);
}

const whiteList = ['/login'];   // 路由白名单
router.beforeEach((to, from, next) => {
    const token = store.getters.token;
    const roles = store.getters.roles;

    NProgress.start()

    if (token) {
        if (to.path === '/login') {
            next('/')
            NProgress.done()
        } else {
            // 没有动态改变权限的需求可直接next() 删除下方权限判断 ↓
            if (hasPermission(roles, to.meta.roles)) {
                next()
            } else {
                next({
                    path: "/401",
                    replace: true,
                    query: { noGoBack: true }
                } as any);
            }
        }
    } else {
        /* has no token*/
        if (whiteList.indexOf(to.path) !== -1) {
            // 在免登录白名单，直接进入
            next();
        } else {
            next("/login"); // 否则全部重定向到登录页
            NProgress.done()
        }
    }
})

router.afterEach(() => {
    NProgress.done()
})