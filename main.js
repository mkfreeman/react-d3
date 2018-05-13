

// Data to pass to our List elements
class Demos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            demos: []
        };
    }

    componentDidMount() {
        d3.csv('data/demos.csv', (data) => {
            this.setState({ demos: data });
        });
    }

    render() {
        return (
            <div>
                {this.state.demos.map(function (d, i) {
                    return (
                        <div key={'demo-' + i}>
                            <h3><a href={d.title} target="_blank">{d.title}</a></h3>
                            <p>{d.description}
                            </p>
                        </div>
                    )
                })}
            </div>
        );
    }
}

// Render your component in the `main` section
ReactDOM.render(<Demos />,
    document.querySelector('#examples')
);