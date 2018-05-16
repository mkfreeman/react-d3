// Application file
class App extends React.Component {
    constructor(props) {
        super(props);

        // Set initial state
        this.state = {
            data: [],
            xVar: "percollege",
            yVar: "percbelowpoverty",
            search: '',
            radius: 3,
            color: '#081AFF', 
            selected: 1
        };
    }
    componentDidMount() {
        // Load data when the component mounts
        d3.csv("data/midwest.csv", (err, data) => {
            this.setState({ data: data });
        });
    }

    // Add method to update the x variable
    updateXvar(d) {
        this.setState({ xVar: d})
    }

     // Add method to update the selected county for the bar chart
     updateSelected(d) {
        console.log('update!')
        this.setState({ selected: d})
    }
    render() {
        // Get list of possible x and y variables
        let options = this.state.data.length === 0 ? [] : Object.keys(this.state.data[0]);
        options = options.filter((d) => d != "county" && d != "state");

        // Store all of the data to be plotted 
        let allData = this.state.data.map((d, i) => {
            return {
                x: d[this.state.xVar],
                y: d[this.state.yVar],
                id: i,
                label: d.county + ", " + d.state,
                group: d.state,
                selected: d.county.toLowerCase().match(this.state.search.toLowerCase()) != null && this.state.search !== ''
            };
        });

        // Store data for the barchart
        let barObservation = this.state.data.filter((d, i) => {
            return i === this.state.selected;
        })[0] || {};

        let barData = Object.keys(barObservation)
            .filter((d) => !isNaN(+barObservation[d]))
            .map((d) => {
            return {
                label: d, 
                value: +barObservation[d]
            }
        });
        
        // Barchart title
        let barTitle = barObservation.county + ", " + barObservation.state
        return (             
                <div className="container">
                    <div className="control-container">

                        {/* X Variable Select Menu */}
                        <div className="control-wrapper">
                            <label htmlFor="xVar">X Variable:</label>
                            <select id="xVar" value={this.state.xVar} className="custom-select" onChange={(d) => this.updateXvar(d.target.value)}>
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

                        {/* Radius Slider */}
                        <div className="control-wrapper">
                            <label htmlFor="radiusSlider">Radius:</label>
                            <input id="radiusSlider" type="range" min={.5} max={10} step={.5} value={this.state.radius} onChange={(d) => this.setState({ radius: d.target.value })} />
                        </div>

                        {/* Color Picker */}
                        <div className="control-wrapper">
                            <label htmlFor="colrPicker">Color:</label>
                            <input id="colorPicker" type="color" value={this.state.color} onChange={(d) => this.setState({ color: d.target.value })} />
                        </div>

                        {/* Search Input */}
                        <div className="control-wrapper">
                            <input className="form-control" placeholder="Search Counties..." onChange={(d) => this.setState({ search: d.target.value })} />
                        </div>
                    </div>

                    {/* Render scatter plots */}
                   <ScatterPlot
                        title={"Demograhpic Comparison"}
                        xTitle={this.state.xVar}
                        yTitle={this.state.yVar}
                        data={allData}
                        radius={this.state.radius}
                        color={this.state.color}
                        update={(d) => this.updateSelected(d)}
                     />
                    

                     {/* Render bar chart */}
                   <BarChart
                        title={barTitle}
                        xTitle={this.state.xVar}
                        yTitle={this.state.yVar}
                        data={barData}
                        radius={this.state.radius}
                        color={this.state.color}
                        update={(d) => this.updateXvar(d)}
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