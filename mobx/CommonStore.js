import {runInAction, makeAutoObservable} from 'mobx';

export default class CommonStore {

    appWindowWidth = null
    detailPhoto = {
        id: null,
        width: null,
        height: null
    }

    constructor() {
        makeAutoObservable(this, {}, {autoBind: true})
    }

    setDetailPhoto(id, width, height) {
        runInAction(() =>
            this.detailPhoto = {id, width, height}
        )
    }

    setAppWindowWidth(width) {
        runInAction(() =>
            this.appWindowWidth = width
        )
    }

}
