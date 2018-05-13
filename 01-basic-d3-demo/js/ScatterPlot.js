// A simple d3 scatter plot
"use strict";

/* ************************************* Set up: set global variables ******************************** */

const width = 500;
const height = 500;

const margin = {
    top: 20,
    right: 10,
    bottom: 50,
    left: 60
};

const radius = 5;
const color = "blue";

// Chart width and height - accounting for margins
let drawWidth = width - margin.left - margin.right;
let drawHeight = height - margin.top - margin.bottom;

// Variables to display (i.e., which columns to select in the dataset)
const xVar = "percbelowpoverty";
const yVar = "percollege";

/* ************************************* Create chart wrappers ************************************** */

// Create an `svg` element to hold the chart (including axes and labels)
let svg = d3.select('#root')
    .append('svg')
    .attr('width', width)
    .attr('height', height);

// Create a `g` element in which to render points
let chartG = svg.append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
    .attr('height', drawHeight)
    .attr('width', drawWidth);


/* ************************************* Load + prepare data ************************************** */
d3.csv("data/midwest.csv", (err, rawData) => {
    // Store data in a more generalized format for reusability
    let data = rawData.map((d) => {
        return {
            x: +d[xVar],
            y: +d[yVar],
            label: d.county + ',' + d.state
        };
    });
    /* ************************************* Defining scales ************************************** */

    // Find the maximum x value for the x Scale, and multiply it by 1.05 (to add space)
    let xMax = d3.max(data, (d) => +d.x) * 1.05;

    // Find the minimum x value for the x Scale, and multiply it by .9 (to add space)
    let xMin = d3.min(data, (d) => +d.x) * 0.9;

    // Use `d3.scaleLinear` to define an `xScale` with the appropriate domain and range
    let xScale = d3.scaleLinear()
        .range([0, drawWidth])
        .domain([xMin, xMax]);

    // Find the maximum y value for the x Scale, and multiply it by 1.05 (to add space)
    let yMax = d3.max(data, (d) => +d.y) * 1.05;

    // Find the minimum y value for the x Scale, and multiply it by .9 (to add space)
    let yMin = d3.min(data, (d) => +d.y) * 0.9;

    // Use `d3.scaleLinear` to define a `yScale` with the appropriate domain and range
    let yScale = d3.scaleLinear()
        .range([0, drawHeight])
        .domain([yMax, yMin]);

    /* ************************************* Defining axes ************************************** */

    // Define xAxis using d3.axisBottom, assigning the scale as `xScale`
    let xAxis = d3.axisBottom(xScale);

    // Define yAxis using d3.axisLeft(), assigning the scale as `yScale`
    let yAxis = d3.axisLeft(yScale);


    /* ************************************* Rendering axes and labels ************************************** */

    // Append a `g` to the `svg` as an x axis label, specifying the 'transform' attribute to position it
    // Use the `.call` method to render the axis in the `g`
    let xAxisLabel = svg.append('g')
        .attr('transform', 'translate(' + margin.left + ',' + (drawHeight + margin.top) + ')')
        .attr('class', 'axis')
        .call(xAxis);

    // Append a `g` to the `svg` as a y axis label, specifying the 'transform' attribute to position it
    // Use the `.call` method to render the axis in the `g`
    let yAxisLabel = svg.append('g')
        .attr('transform', 'translate(' + margin.left + ',' + (margin.top) + ')')
        .attr('class', 'axis')
        .call(yAxis);

    // Add a title to the chart
    let title = svg.append('text')
        .attr('transform', `translate(${margin.left},15)`)
        .text("Midwest Counties");

    // Append a text element to the svg to label the x axis
    let xAxisText = svg.append('text')
        .attr('transform', `translate(${(margin.left + drawWidth / 2)}, ${(height - margin.bottom + 30)})`)
        .attr('class', 'axis-label')
        .text(xVar);

    // Append a text element to the svg to label the y axis
    svg.append('text')
        .attr('transform', `translate( ${(margin.left - 30)},${(margin.top + drawHeight / 2)}) rotate(-90)`)
        .attr('class', 'axis-label')
        .text(yVar);


    /* ************************************* Define Tooltip ************************************** */
    let tip = d3.tip().attr('class', 'd3-tip').html(function (d) {
        return d.label;
    });

    /* ************************************* Data Join ************************************** */
    // Select all circles and bind data to the selection
    let circles = chartG.selectAll('circle').data(data);

    // Use the `.enter()` method to identify the entering elements, and assign their positions
    // Then, merge on any updating circles and set all the properties
    circles.enter().append('circle')
        .on('mouseover', tip.show)
        .on('mouseout', tip.hide)
        .attr('r', (d) => radius)
        .attr('fill', (d) => color)
        .attr('label', (d) => d.label)
        .style('fill-opacity', 0.3)
        .merge(circles)
        .transition().duration(500)
        .attr('cx', (d) => xScale(d.x))
        .attr('cy', (d) => yScale(d.y));


    // Use the .exit() and .remove() methods to remove elements that are no longer in the data
    circles.exit().remove();

    // Add hovers using the d3-tip library        
    chartG.call(tip);
});
