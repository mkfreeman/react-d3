// Scatterplot
class ScatterPlot extends React.Component {
    constructor(props) {
        super(props);
        // Graph width and height - accounting for margins
        this.drawWidth = this.props.width - this.props.margin.left - this.props.margin.right;
        this.drawHeight = this.props.height - this.props.margin.top - this.props.margin.bottom;

    }

    // When the component mounts, call the `update()` method
    componentDidMount() {
        this.update();
    }
    
    // Whenever the component updates, call the `update()` method
    componentDidUpdate() {
        this.update();
    }

    // Define the functions for `this.xScale()` and `this.yScale()` based on current data
    updateScales() {
        // Calculate limits: minimum/maximum x and y values in the data
        

        // Define scales `this.xScale()` and `this.yScale()` using the `d3.scaleLinear()`
        
    }

    // Update the position of the circles
    updatePoints() {
        // Define hovers 
        // Add tip
        let tip = d3.tip().attr('class', 'd3-tip').html(function (d) {
            return d.label;
        });

        // Bind data: select all circles and bind data
        

        // Append and position elements: using `enter()` and `merge()`
                  

        // Exit and remove elements
        

        // Add hovers using the d3-tip library        
        
    }

    // Update axes
    updateAxes() {
        // Define axis functions
        

        // Draw axes: select your axes and call the axis functions defined above
        
    }

    // Update function: call `updateScales()`, `updateAxes()`, and `updatePoints()`
    update() {
        
    }

    // Render method
    render() {
        return (
            <div className="chart-wrapper">
                <svg className="chart" width={this.props.width} height={this.props.height}>
                    <text transform={`translate(${this.props.margin.left},15)`}>{this.props.title}</text>
                    <g transform={`translate(${this.props.margin.left}, ${this.props.margin.top})`} />

                    {/* Axes */}
                    <g transform={`translate(${this.props.margin.left}, ${this.props.height - this.props.margin.bottom})`}></g>
                    <g transform={`translate(${this.props.margin.left}, ${this.props.margin.top})`}></g>

                    {/* Axis labels */}
                    <text className="axis-label" transform={`translate(${this.props.margin.left + this.drawWidth / 2}, 
                        ${this.props.height - this.props.margin.bottom + 30})`}>{this.props.xTitle}</text>

                    <text className="axis-label" transform={`translate(${this.props.margin.left - 30}, 
                        ${this.drawHeight / 2 + this.props.margin.top}) rotate(-90)`}>{this.props.yTitle}</text>
                </svg>
            </div>

        )
    }
}

ScatterPlot.defaultProps = {
    data: [{ x: 10, y: 20 }, { x: 15, y: 35 }],
    width: 300,
    height: 300,
    radius: 5,
    color: "blue",
    margin: {
        left: 50,
        right: 10,
        top: 20,
        bottom: 50
    },
    xTitle: "X Title",
    yTitle: "Y Title",
    title:"Chart Title"
};