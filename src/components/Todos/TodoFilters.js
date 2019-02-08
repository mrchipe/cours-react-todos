import React, {Component} from 'react'

class TodoFilters extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    changeFilter = (event, filter) => {
        this.props.setFilter(filter)
        event.preventDefault()
    }

    render() {
        return (
            <ul className={"filters"}>
                <li><a href="#" onClick={(e) => this.changeFilter(e, 'all')} className={this.props.filter === 'all' && "selected"}>All</a></li>
                <li><a href="#" onClick={(e) => this.changeFilter(e, 'active')} className={this.props.filter === 'active' && "selected"}>Active</a></li>
                <li><a href="#" onClick={(e) => this.changeFilter(e, 'completed')} className={this.props.filter === 'completed' && "selected"}>Completed</a></li>
            </ul>
        );
    }
}

export default TodoFilters;
