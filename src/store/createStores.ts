import { myState } from './stores'
import MyState from './data/countNum'
import { configure } from 'mobx'


configure({ enforceActions: "always" });

export function CreateStores() {
    return {
        [myState]: new MyState()
    }
}