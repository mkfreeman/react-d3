// Application file
class App extends React.Component {
    constructor(props) {
        super(props);

        // Set initial state
        this.state = {
            data: [],
            variable: "percollege",
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

        // Store all of the data to be summarized
        let allData = this.state.data.map((d) => {
            return {
                value: +d[this.state.variable],
                state: d.state,
                county: d.county
            };
        });

        // Compute summary state
        let mean = d3.mean(allData, (d) => d.value);


        return (
            <div>
                <div className="container">
                    <div className="control-container">
                        {/* X Variable Select Menu */}
                        <div className="control-wrapper">
                            <label htmlFor="variable">Variable:</label>
                            <select id="variable" value={this.state.variable} className="custom-select" onChange={(d) => this.setState({ variable: d.target.value })}>
                                {options.map((d) => {
                                    return <option key={d}>{d}</option>
                                })}
                            </select>
                        </div>
                        {/* Radius Slider: convert to a table showing top N.
                        <div className="control-wrapper">
                            <label htmlFor="radiusSlider">Radius:</label>
                            <input id="radiusSlider" type="range" min={.5} max={10} step={.5} value={this.state.radius} onChange={(d) => this.setState({ radius: d.target.value })} />
                        </div>
                        */}
                    </div>

                    {/* Render scatter plots */}
                    <p>Mean: {mean}</p>
                </div>
            </div >
        )
    }
}

// Render application
ReactDOM.render(
    <App />,
    document.getElementById('root')
);