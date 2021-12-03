import Cookie from "js-cookie";

// TODO: 需要把token的字段名定好、后端会从cookie里解出来进行身份校验
const TokenKey = "Hsx-Platform-Token";
const RolesKey = "Hsx-Platform-Roles";
const UserKey = "Hsx-Platform-User";

export function getToken() {
    return Cookie.get(TokenKey)
}

export function setToken(token: string) {
    return Cookie.set(TokenKey, token)
}

export function removeToken() {
    return Cookie.remove(TokenKey)
}

export function getRoles() {
    return Cookie.getJSON(RolesKey)
}

export function setRoles(roles: any) {
    return Cookie.set(RolesKey, roles)
}

export function removeRoles() {
    return Cookie.remove(RolesKey)
}

export function getUser() {
    return Cookie.getJSON(UserKey)
}

export function setUser(user: any) {
    return Cookie.set(UserKey, user)
}

export function removeUser() {
    return Cookie.remove(UserKey)
}