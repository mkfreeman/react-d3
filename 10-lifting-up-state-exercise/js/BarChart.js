// Scatterplot
class BarChart extends React.Component {
    constructor(props) {
        super(props);
        // Graph width and height - accounting for margins
        this.drawWidth = this.props.width - this.props.margin.left - this.props.margin.right;
        this.drawHeight = this.props.height - this.props.margin.top - this.props.margin.bottom;

    }
    componentDidMount() {
        this.update();
    }
    // Whenever the component updates, select the <g> from the DOM, and use D3 to manipulte circles
    componentDidUpdate() {
        this.update();
    }
    updateScales() {
        // Calculate limits
        let xMin = d3.min(this.props.data, (d) => +d.value * .9);
        let xMax = d3.max(this.props.data, (d) => +d.value * 1.1);

        // Define scales
        this.xScale = d3.scaleLinear().domain([xMin, xMax]).range([0, this.drawWidth]);
        this.yScale = d3.scaleBand().rangeRound([0, this.drawHeight]).padding(0.1).domain(this.props.data.map((d) => d.label));
    }
    updatePoints() {
        // Define hovers 
        // Add tip
        let tip = d3.tip().attr('class', 'd3-tip').html(function (d) {
            return d.label;
        });

        // Select all rects and bind data
        let rects = d3.select(this.chartArea).selectAll('rect').data(this.props.data);

        // Use the .enter() method to get your entering elements, and assign their positions
        rects.enter().append('rect')
            .merge(rects)
            .attr('fill', (d) => this.props.color)
            .attr('label', (d) => d.label)
            .style('fill-opacity', 0.3)
            .attr('width', (d) => this.xScale(d.value))
            .attr('height', this.yScale.bandwidth())
            .attr('y', (d) => this.yScale(d.label));

        // Use the .exit() and .remove() methods to remove elements that are no longer in the data
        rects.exit().remove();

        // Add hovers using the d3-tip library        
        d3.select(this.chartArea).call(tip);
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
    update() {
        this.updateScales();
        this.updateAxes();
        this.updatePoints();
    }
    render() {
        return (
            <div className="chart-wrapper">
                <svg className="chart" width={this.props.width} height={this.props.height}>
                    <text transform={`translate(${this.props.margin.left},15)`}>{this.props.title}</text>
                    <g ref={(node) => { this.chartArea = node; }}
                        transform={`translate(${this.props.margin.left}, ${this.props.margin.top})`} />

                    {/* Axes */}
                    <g ref={(node) => { this.xAxis = node; }}
                        transform={`translate(${this.props.margin.left}, ${this.props.height - this.props.margin.bottom})`}></g>
                    <g ref={(node) => { this.yAxis = node; }}
                        transform={`translate(${this.props.margin.left}, ${this.props.margin.top})`}></g>

                    {/* Axis labels */}
                    <text className="axis-label" transform={`translate(${this.props.margin.left + this.drawWidth / 2}, 
                        ${this.props.height - this.props.margin.bottom + 30})`}>{this.props.xTitle}</text>
                </svg>
            </div>

        )
    }
}

BarChart.defaultProps = {
    data: [{ x: 10, y: 20 }, { x: 15, y: 35 }],
    width: 300,
    height: 300,
    radius: 5,
    color: "blue",
    margin: {
        left: 120,
        right: 10,
        top: 20,
        bottom: 50
    },
    xTitle: "X Title",
    yTitle: "Y Title",
};