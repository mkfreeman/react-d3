// Application file
class App extends React.Component {
    constructor(props) {
        super(props);

        // Set initial state
        this.state = {
            data: [],
            xVar: "percollege",
            yVar: "percbelowpoverty"
        };
    }
    // Load data and set statewhen the component mounts
    componentDidMount() {
                
    }
    render() {
        // Get list of possible x and y variables
        let options = this.state.data.length === 0 ? [] : Object.keys(this.state.data[0]);
        options = options.filter((d) => d != "county" && d != "state");

        // Compute allData: an array of objects for your scatterplot

        return (
            <div>
                <div className="jumbotron">
                    <h1 className="display-3">08-scatter-exercise</h1>
                    <p className="lead">Making a D3 scatterplot in React</p>
                    <span><a href="../">(all exercises)</a></span>
                </div>
                <div className="container">
                    <div className="control-container">

                        {/* X Variable Select Menu */}
                        <div className="control-wrapper">
                            <label htmlFor="xVar">X Variable:</label>
                            <select id="xVar" value={this.state.xVar} className="custom-select" onChange={(d) => this.setState({ xVar: d.target.value })}>
                                {options.map((d) => {
                                    return <option key={d}>{d}</option>
                                })}
                            </select>
                        </div>

                        {/* Create a Y Variable Select Menu */}
                                              
                    </div>

                    {/* Render a `<ScatterPlot>` plot */}
                    
                </div>
            </div>
        )
    }
}

// Render application
ReactDOM.render(
    <App />,
    document.getElementById('root')
);