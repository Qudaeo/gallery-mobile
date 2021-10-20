import {runInAction, makeAutoObservable} from 'mobx';

export default class CommonStore {

    appWindowWidth = null
    detailId = null

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true })
    }

    setDetailId(id) {
        runInAction(() =>
            this.detailId = id
        )
    }

    setAppWindowWidth(width) {
        runInAction(() =>
            this.appWindowWidth = width
        )
    }

}
