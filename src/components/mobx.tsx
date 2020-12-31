import { computed, observable } from "mobx";

// observable 绑定状态值
// computed 计算属性
// Reactions 计算值很像，但它不是产生一个新的值，而是会产生一些副作用


interface todosProps {
    finished?: boolean
}

class Todo {
    id = Math.random();
    @observable title = "";
    @observable finished = false;
}

class TodoList {
    @observable todos: todosProps[] = [];
    @computed get unfinishedTodoCount() {
        return this.todos.filter(todo => !todo.finished).length;
    }
}