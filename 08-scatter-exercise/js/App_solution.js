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
    componentDidMount() {
        // Load data when the component mounts
        d3.csv("data/midwest.csv", (err, data) => {
            this.setState({ data: data });
        });
    }
    render() {
        // Get list of possible x and y variables
        let options = this.state.data.length === 0 ? [] : Object.keys(this.state.data[0]);
        options = options.filter((d) => d != "county" && d != "state");

        // Store all of the data to be plotted 
        let allData = this.state.data.map((d) => {
            return {
                x: d[this.state.xVar],
                y: d[this.state.yVar],
                label: d.county + ", " + d.state
            };
        });

        return (
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

                    {/* Y Variable Select Menu */}
                    <div className="control-wrapper">
                        <label htmlFor="yVar">Y Variable:</label>
                        <select id="yVar" value={this.state.yVar} className="custom-select" onChange={(d) => this.setState({ yVar: d.target.value })}>
                            {options.map((d) => {
                                return <option key={d}>{d}</option>
                            })}
                        </select>
                    </div>                        
                </div>

                {/* Render scatter plot */}
                <ScatterPlot
                    xTitle={this.state.xVar}
                    yTitle={this.state.yVar}
                    data={allData}
                    />
            </div>
        )
    }
}

// Render application
ReactDOM.render(
    <App />,
    document.getElementById('root')
);