// Scatterplot
class ScatterPlot extends React.Component {
    constructor(props) {
        super(props);
        // Graph width and height - accounting for margins
        this.drawWidth = this.props.width - this.props.margin.left - this.props.margin.right;
        this.drawHeight = this.props.height - this.props.margin.top - this.props.margin.bottom;    

    }
    componentDidMount() {
        this.setScales();
        this.updatePoints();
        this.updateAxes()
    }
    setScales() {
        // Calculate limits
        let xMin = d3.min(this.props.data, (d) => +d.x * .9);
        let xMax = d3.max(this.props.data, (d) => +d.x * 1.1);
        let yMin = d3.min(this.props.data, (d) => +d.y * .9);
        let yMax = d3.max(this.props.data, (d) => +d.y * 1.1);

        // Define scales
        this.xScale = d3.scaleLinear().domain([xMin, xMax]).range([0, this.drawWidth])
        this.yScale = d3.scaleLinear().domain([yMax, yMin]).range([0, this.drawHeight])
    }
    updatePoints() {        
        // Select all circles and bind data
        var circles = d3.select(this.chartArea).selectAll('circle').data(this.props.data);

        // Use the .enter() method to get your entering elements, and assign their positions
        circles.enter().append('circle')
            .merge(circles)
            .attr('r', (d) => this.props.radius(d))
            .attr('fill', (d) => this.props.fill(d))
            .attr('cy', this.drawHeight)
            .style('opacity', 0.3)            
            .attr('cx', (d) => this.xScale(d.x))
            .transition().duration(500)
            .attr('cy', (d) => this.yScale(d.y))            
            .attr('title', function(d) {
                return d.title;
            });

        // Use the .exit() and .remove() methods to remove elements that are no longer in the data
        circles.exit().remove();
    }
    updateAxes() {       
        let xAxisFunction = d3.axisBottom()
            .scale(this.xScale)
            .ticks(5, 's');
        
        let yAxisFunction = d3.axisLeft()
            .scale(this.yScale)
            .ticks(5, 's');

        d3.select(this.xAxis)
            .call(xAxisFunction);
        
        d3.select(this.yAxis)
            .call(yAxisFunction);
    }
    render() {
        console.log("x scale", this.xScale)
        return (
            <div>
                <svg className="chart" width={ this.props.width } height={ this.props.height }>
                    <g ref={ (node) => {this.chartArea = node;}}/>
                    
                    {/* Axes */}
                    <g ref={ (node) => {this.xAxis = node;}}
                       transform={`translate(${this.props.margin.left}, ${this.props.height - this.props.margin.bottom})`}></g>
                    <g ref={ (node) => {this.yAxis = node;}}
                       transform={`translate(${this.props.margin.left}, ${this.props.margin.top})`}></g>
                    
                    {/* Axis labels */}
                    <text className="axis-label" transform={`translate(${this.props.margin.left + this.drawWidth / 2}, 
                        ${this.props.height - this.props.margin.bottom + 30})`}>{this.props.xTitle}</text>
                    
                    <text className="axis-label" transform={`translate(${this.props.margin.left - 40}, 
                        ${this.drawHeight/2 + this.props.margin.top}) rotate(-90)`}>{this.props.yTitle}</text>
                </svg>
            </div>

        )
    }
}

ScatterPlot.defaultProps = {
    data: [{x:10, y:20}, {x:15, y:35}], 
    width:500, 
    height:500,
    radius:(d) => 5,
    fill:(d) => "blue",
    margin: {
        left:50, 
        right:10, 
        top:50, 
        bottom:50
    }, 
    xTitle:"X Title", 
    yTitle:"Y Title", 
  };
  