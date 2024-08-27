import {makeAutoObservable} from "mobx";

export default class UserStore {
    constructor() {
        this._isAuth = false
        this._user = {}
        this._userData = 0
        makeAutoObservable(this)
    }

    setIsAuth(bool) {
        this._isAuth = bool
    }
    setUser(user) {
        this._user = user
    }
    setUserData(userData) {
        this._userData = userData
    }

    get isAuth() {
        return this._isAuth
    }
    get user() {
        return this._user
    }
    get userData() {
        return this._userData
    }
}
