import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";

export const createType = async (type) => {
    const {data} = await $authHost.post('api/type', type)
    return data
}

export const fetchTypes = async () => {
    const {data} = await $host.get('api/type')
    return data
}

export const fetchDevicesUsername = async (username) => {
    const {data} = await $host.get('api/device/username', {params: {
        username
    }})
    return data
}

export const fetchTypesBrands = async (name) => {
    const {data} = await $host.get('api/typebrand', {params: {
            name
        }})
    return data
}

export const createBrand = async (brand, description) => {
    const {data} = await $authHost.post('api/brand', brand, description)
    return data
}

export const fetchMyDevices= async (name) => {
    const {data} = await $host.get('api/devicemy', {params: {
            name
        }})
    return data
}

export const fetchBrands = async () => {
    const {data} = await $host.get('api/brand', )
    return data
}

export const createDevice = async (device) => {
    try {
        const {data} = await $authHost.post('api/device', device)
        return data
    }catch (e) {
        alert('NO ADD!!! ==> Download file < 1mb')
    }
}

export const updateDeviceTimestate = async (device) => {
    const {data} = await $authHost.post('api/device/update/timestate', device)
    return data
}

export const updateLinkVideo = async (device) => {
    const {data} = await $authHost.post('api/device/update/linkvideo', device)
    return data
}

export const updateDeviceFile = async (device) => {
    try {
        const {data} = await $authHost.post('api/device/update/file', device)
        return data
    } catch (e) {
        alert('NO ADD!!! ==> Download file < 1mb')
    }
}

export const fetchDevices = async (typeName, brandName, page, limit) => {
    const {data} = await $host.get('api/device', {params: {
            typeName, brandName, page, limit
        }})
    return data
}

export const fetchOneDevice = async (id) => {
    const {data} = await $host.get('api/device/' + id)
    return data
}
