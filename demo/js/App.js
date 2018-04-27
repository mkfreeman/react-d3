// Application file
class App extends React.Component {
    render() {
        return (
            <div>
                {d3.range(10).map((d) => {
                    return <ScatterPlot/>
                })}
            </div>
        )
    }
}

// Render application
ReactDOM.render(
    <App />,
    document.getElementById('root')
);