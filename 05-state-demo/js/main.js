// Solution: making a todo list
"use strict";

// A set of items to render in your todolist
const todos = [
    {
        description: "Learn how to use React and D3",
        priority: "high",
        status: "incomplete"

    },
    {
        description: "Explore Paris",
        priority: "medium",
        status: "complete"
    },
    {
        description: "Catch up on work",
        priority: "low",
        status: "incomplete"
    }
];

// Create a component ToDo that represents an item in a to do list (see README.md for instructions)
class Todo extends React.Component {
    // Render the Todo item
    render() {
        return (
            <div className={"todo " + this.props.priority}>
                <p className={this.props.status}>{this.props.description}</p>
            </div>
        )
    }
}

// Create a class TodoList (see README.md for instructions)
class TodoList extends React.Component {
    // Add a constructor method to set the state
    constructor(props) {
        super(props);
        this.state = {
            search: ""
        }
    }

    // Render a Todo component for each element in the `list` props
    render() {
        // Filter down the list of todos to the state
        let currentList = this.props.list.filter((d) => {
            return d.description.match(this.state.search);
        })
        return (
            <div>
                {/* An input element to search through the todo items*/}
                <input className="form-control" placeholder="Search Todos...." onChange={(event) => this.setState({ search: event.target.value })} />
                {currentList.map((d, i) => {
                    return <Todo key={i} status={d.status} priority={d.priority} description={d.description} />
                })
                }
            </div>
        )
    }
}

// Render the TodoList component in the `root` element
ReactDOM.render(
    <TodoList list={todos} />,
    document.getElementById('root')
);