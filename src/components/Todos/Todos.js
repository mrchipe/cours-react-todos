import React, {Component} from 'react'
import Todo from './Todo'
import Filters from './TodoFilters'

import './todos.css'

/**
 * {
 *     id: 1,
 *     title: "Je suis un titre !",
 *     completed: false,
 * }
 */
class Todos extends Component {
    constructor(props) {
        super(props)
        this.state = {
            newTodo: '',
            allTodosIsCompleted: false,
            filter: 'all',
            todos: [],
        }

        this.index = 3
    }

    componentDidMount() {
        let todos = localStorage.getItem("todos")
        if (todos !== null) {
            this.setState({todos: JSON.parse(todos)}, () => {
                this.allTodosIsCompleted()
            })
        }
    }

    addTodo(title, completed = false) {
        let todos = this.state.todos
        let todo = {id: this.index, title: title, completed: completed}

        todos.push(todo)

        this.index++
        this.setState({todos: todos})
        localStorage.setItem("todos", JSON.stringify(todos))

        this.allTodosIsCompleted()
        return true
    }

    updateTodo = (id, attributes = {}) => {
        if (Object.keys(attributes).length > 0) {
            let todos = this.state.todos
            todos.map((todo, key) => {
                if (todo.id === id) {
                    for (let attribute in attributes) {
                        todos[key][attribute] = attributes[attribute]
                    }
                    this.setState({todos: todos})
                    localStorage.setItem("todos", JSON.stringify(todos))
                }
            })
        }

        this.allTodosIsCompleted()
    }

    getTodos = () => {
        let filter = this.state.filter
        if (filter === "all") {
            return this.state.todos
        } else if (filter === "active") {
            return this.state.todos.filter(todo => !todo.completed)
        } else if (filter === "completed") {
            return this.state.todos.filter(todo => todo.completed)
        }

        return []
    }

    setFilter = (filter) => {
        this.setState({filter: filter})
    }

    todoCount = () => {
        let count = 0
        this.state.todos.map((todo) => {
            if (!todo.completed) {
                count++
            }
        })
        return count
    }

    removeTodo = (id) => {
        let todos = this.state.todos.filter(todo => todo.id !== id)
        this.setState({todos: todos})
        localStorage.setItem("todos", JSON.stringify(todos))
    }

    allTodosIsCompleted = () => {
        let todos = this.state.todos
        for (let i = 0; i < todos.length; i++) {
            if (todos[i].completed !== true) {
                return this.setState({allTodosIsCompleted: false})
            }
        }

        this.setState({allTodosIsCompleted: true})
    }

    setNewTodo = (event) => {
        this.setState({newTodo: event.target.value})
    }

    newTodo = (event) => {
        if (event.key === "Enter" && this.state.newTodo.length > 0) {
            if (this.addTodo(this.state.newTodo)) {
                event.target.value = ""
                this.setState({newTodo: ''})
            }
            event.preventDefault()
        }
    }

    setAllCompleted = (event) => {
        let completed = this.state.allTodosIsCompleted
        this.state.todos.map((todo) => {
            this.updateTodo(todo.id, {completed: !completed})
        })
    }

    setCompleted = (id, completed) => {
        this.updateTodo(id, {'completed': completed})
    }

    remaining = () => {
        let count = this.todoCount()
        if (count > 1) {
            return count + " items left"
        } else {
            return count + " item left"
        }
    }

    clearCompleted = () => {
        let todos = this.state.todos.filter(todo => !todo.completed)
        this.setState({todos: todos})
        localStorage.setItem("todos", JSON.stringify(todos))
    }

    render() {
        return (
            <div className="todoapp">
                <header className={"header"}>
                    <h1>todos</h1>
                    <input type="text" className={"new-todo"} placeholder={"What needs to be done"} onKeyUp={this.newTodo} onChange={this.setNewTodo}/>
                </header>
                {this.state.todos.length > 0 &&
                    <section className="main">
                        <input id={"toggle-all"} className={"toggle-all"} type="checkbox" onClick={this.setAllCompleted} checked={this.state.allTodosIsCompleted}/>
                        <label htmlFor="toggle-all">Mark all as complete</label>
                        <ul className={"todo-list"}>
                            {this.getTodos().map((todo) => {
                                return  <Todo update={this.updateTodo} remove={this.removeTodo} setCompleted={this.setCompleted} id={todo.id} title={todo.title} completed={todo.completed} key={todo.id}></Todo>
                            })}
                        </ul>
                    </section>
                }
                {this.state.todos.length > 0 &&
                    <footer className="footer">
                        <span className="todo-count">
                            <strong>{this.remaining()}</strong>
                        </span>
                        <Filters setFilter={this.setFilter} filter={this.state.filter}></Filters>
                        {this.state.todos.length > this.todoCount() &&
                            <button className={"clear-completed"} onClick={this.clearCompleted}>Clear completed</button>
                        }
                    </footer>
                }
            </div>
        );
    }
}

export default Todos;
