import { action, computed, observable } from "mobx";
class MyState {
    @observable public num1 = 0;
    @observable public num2 = 100;
    @action public addNum1 = () => {
        this.num1 += 1;
    };
    @action public addNum2 = () => {
        this.num2 += 1;
    };
    @computed public get total() {
        return this.num1 + this.num2
    }
}

export default MyState