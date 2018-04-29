// A simple react component
"use strict";

// Create a component that represents someone's biography
class Bio extends React.Component {
    // React components have a render method to describe how to draw them on the DOM
    render() {
        return (
            <div>
                <h1>Arthur</h1>
                <p>Hello, my name is {this.props.name} and I am an {this.props.description}.</p>
            </div>
        )
    }
}

// Render the Bio component in the `root` element
ReactDOM.render(
    <Bio name="Arthur" description="aardvark" />,
    document.getElementById('root')
);