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
    // Render a Todo component for each element in the `list` props
    render() {
        return (
            <div>
                {this.props.list.map((d) => {
                    return <Todo status={d.status} priority={d.priority} description={d.description} />
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