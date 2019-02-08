import React, {Component} from 'react'

class Todo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: '',
            editing: false,
        }
    }

    updateComplete = (event) => {
        let completed = this.props.completed
        this.props.setCompleted(this.props.id, !completed)
    }

    removeTodo = (event) => {
        this.props.remove(this.props.id)
    }

    startEdit = (event) => {
        this.setState({value: event.target.textContent, editing: true})
        setTimeout(() => {
            this.editInput.focus()
        }, 0)
    }

    setValue = (event) => {
        this.setState({value: event.target.value})
    }

    keyUpEdit = (event) => {
        if (event.key === "Escape") {
            this.cancelEdit(event)
        } else if (event.key === "Enter") {
            this.doneEdit(event)
        }
    }

    doneEdit = (event) => {
        if (this.state.editing) {
            this.props.update(this.props.id, {title: this.state.value})
            this.setState({editing: false})
        }
    }

    cancelEdit = (event) => {
        this.setState({editing: false})
        setTimeout(() => {
            this.editInput.blur()
        }, 0)
    }

    render() {
        return (
            <li className={"todo " + (this.props.completed ? "completed " : '') + (this.state.editing ? "editing " : '')}>
                <div className="view">
                    <input type="checkbox" className={"toggle"} checked={this.props.completed} onClick={this.updateComplete}/>
                    <label onDoubleClick={this.startEdit}>{this.props.title}</label>
                    <button className={"destroy"} onClick={this.removeTodo}></button>
                </div>
                <input ref={(input) => {this.editInput = input}} className={"edit"} type="text" value={this.state.value} onChange={this.setValue} onBlur={this.doneEdit} onKeyUp={this.keyUpEdit}/>
            </li>
        );
    }
}

export default Todo;
