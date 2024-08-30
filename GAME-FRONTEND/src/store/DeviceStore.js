import {makeAutoObservable} from "mobx";

export default class DeviceStore {
    constructor() {
        this._types = []
        this._brands = []
        this._typesBrands = []
        this._devices = []
        this._myDevices = []
        this._myDevices2 = []
        this._selectedDevicesUsername = []
        this._selectedType = {}
        this._selectedTypeBrand = []
        this._page = 1
        this._totalCount = 0
        this._limit = 30
        makeAutoObservable(this)
    }

    setTypes(types) {
        this._types = types
    }
    setBrands(brands) {
        this._brands = brands
    }
    setTypesBrands(typesBrands) {
        this._typesBrands = typesBrands
    }
    setDevices(devices) {
        this._devices = devices
    }
    setMyDevices(myDevices) {
        this._myDevices = myDevices
    }
    setMyDevices2(myDevices2) {
        this._myDevices2 = myDevices2
    }
    setSelectedDevicesUsername(selectedDevicesUsername) {
        this._selectedDevicesUsername = selectedDevicesUsername
    }
    setSelectedType(type) {
        this.setPage(1)
        this._selectedType = type
    }
    setSelectedTypeBrand(selectedTypeBrand) {
        this._selectedTypeBrand = selectedTypeBrand
    }
    setPage(page) {
        this._page = page
    }
    setTotalCount(count) {
        this._totalCount = count
    }

    get types() {
        return this._types
    }
    get brands() {
        return this._brands
    }
    get typesBrands() {
        return this._typesBrands
    }
    get devices() {
        return this._devices
    }
    get myDevices() {
        return this._myDevices
    }
    get myDevices2() {
        return this._myDevices2
    }
    get selectedDevicesUsername() {
        return this._selectedDevicesUsername
    }
    get selectedType() {
        return this._selectedType
    }
    get selectedTypeBrand() {
        return this._selectedTypeBrand
    }
    get totalCount() {
        return this._totalCount
    }
    get page() {
        return this._page
    }
    get limit() {
        return this._limit
    }
}
