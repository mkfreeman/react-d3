// Axis
class Axis extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        let axisFunction = d3.axisBottom()
            .scale(this.props.scale)
            .ticks(5, 's');

        d3.select(this.root)
            .call(axisFunction);
    }
    render() {
        return(<g transform={`translate(${this.props.offsetX}, ${this.props.offsetY})`} ref={(node) => {this.root = node }}></g>)
    }
}

Axis.defaultProps = {
    offsetX:100, 
    offsetY:100
}