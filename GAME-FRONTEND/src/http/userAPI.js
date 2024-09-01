import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";

export const registration = async (email, password, ip) => {
    const {data} = await $host.post('api/user/registration', {email, password, ip, role: 'ADMIN'})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const login = async (email, password, ip) => {
    const {data} = await $host.post('api/user/login', {email, password, ip})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const check = async () => {
    const {data} = await $authHost.get('api/user/auth' )
    localStorage.setItem('token', data.token)
    return data
}
export const getDataUsers = async () => {
    try {
        const {data} = await $host.get('api/user/users' )
        return data
    }catch (e) {
        console.log(e)
    }
}

