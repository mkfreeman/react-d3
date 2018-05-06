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
        
    }
    render() {
        // Create a variable `options` storing the list of possible variables to show. 
        // These should be the **object keys** from the first element in your data, excluding "county" and "state".
       

        // Create a variable `allData` in which you store the current value of interest 
        // (based on `this.state.variable`), as well as the state and county
        

        // Store the mean of the current value in a variable `mean`
        

        // Store the top N values (based on `this.state.nShow`) from the data in a variable. 
        // Observatiosn should be sorted by the current sorting variable (`this.state.variable`) 
        // in either ascending or descending order (`this.state.sort`).
        

        // Return an HTML node to render
        return (
            <div>
                <div className="container">
                    <div className="control-container">
                        
                        {/* Create a Select Menu to determine which variable is shown in the table */}
                        
                        
                        {/*Create a Slider to control how many rows are shown in the table */}
                        

                        {/*Create a Button Group to control if rows in the table are shown in ascending or descending order */}
                        
                    </div>

                    {/* Display the average value (`mean`) in a paragraph element */}
                    

                    {/* Show a table of the top N counties */}                
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