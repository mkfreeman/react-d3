// Application file
class App extends React.Component {

    constructor(props) {
        super(props);

        // Set initial state
        this.state = {
            data: [],
            variable: "percollege",
            nShow: 10, 
            sort:"ascending"
        };
    }

    componentDidMount() {
        // Load data when the component mounts
        d3.csv("data/midwest.csv", (err, data) => {
            this.setState({ data: data });
        });
    }
    render() {
        // Create a variable `options` storing the list of possible variables to show. 
        // These should be the **object keys** from the first element in your data, excluding "county" and "state".
        let options = this.state.data.length === 0 ? [] : Object.keys(this.state.data[0]);
        options = options.filter((d) => d != "county" && d != "state");

        // Create a variable `allData` in which you store the current value of interest 
        // (based on `this.state.variable`), as well as the state and county
        let allData = this.state.data.map((d) => {
            return {
                value: +d[this.state.variable],
                state: d.state,
                county: d.county
            };
        });

        // Store the mean of the current value in a variable `mean`
        let mean = d3.mean(allData, (d) => d.value) || 0;

        // Store the top N values (based on `this.state.nShow`) from the data in a variable. 
        // Observatiosn should be sorted by the current sorting variable (`this.state.variable`) 
        // in either ascending or descending order (`this.state.sort`).
        let topData = allData.sort((a, b) => {
            return this.state.sort == "ascending" ? a.value - b.value : b.value - a.value;
        }).filter((d, i) => i < this.state.nShow)


        // Return an HTML node to render
        return (
            <div>
                <div className="container">
                    <div className="control-container">
                        
                        {/* Create a Select Menu to determine which variable is shown in the table */}
                        <div className="control-wrapper">
                            <label htmlFor="variable">Variable:</label>
                            <select id="variable" value={this.state.variable} className="custom-select" onChange={(d) => this.setState({ variable: d.target.value })}>
                                {options.map((d) => {
                                    return <option key={d}>{d}</option>
                                })}
                            </select>
                        </div>
                        
                        {/*Create a Slider to control how many rows are shown in the table */}
                        <div className="control-wrapper">
                            <label htmlFor="radiusSlider">Show the top {this.state.nShow} Counties:</label>
                            <input id="radiusSlider" type="range" min={1} max={50} step={1} value={this.state.nShow} onChange={(d) => this.setState({ nShow: d.target.value })} />
                        </div>

                        {/*Create a Button Group to control if rows in the table are shown in ascending or descending order */}
                        <div className="btn-group" role="group" aria-label="Basic example">
                            {["ascending", "descending"].map((d) =>{
                                return <button key={d} type="button" 
                                            className={"btn btn-secondary " + (this.state.sort == d ? "active" : "")}
                                            onClick={(e) => this.setState({ sort: d })}>{d}
                                        </button>
                            })}
                        </div>
                    </div>

                    {/* Display the average value (`mean`) in a paragraph element */}
                    <p><strong>Average {this.state.variable}</strong>: {mean.toFixed(1) + "%"}</p>

                    {/* Show a table of the top N counties */}
                    <table className="table">
                        <tbody>
                            <tr>
                                <th>County</th>
                                <th>{this.state.variable}</th> 
                            </tr>
                            {topData.map((d, i) => {
                                return (
                                    <tr key = {"row-" + i}>
                                        <td>{d.county + ", " + d.state}</td>
                                        <td>{d.value.toFixed(1) + "%"}</td>
                                    </tr>
                                )
                            })

                            }
                        </tbody>
                    </table>
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