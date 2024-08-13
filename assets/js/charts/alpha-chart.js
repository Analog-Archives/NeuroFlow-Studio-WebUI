const svg = d3.select("#alpha_chart"),
    margin = { top: 20, right: 20, bottom: 30, left: 50 },
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom;

const x = d3.scaleTime().range([0, width]);
const y = d3.scaleLinear().range([height, 0]);

const line = d3.line()
    .x(d => x(d.time))
    .y(d => y(d.value))
    .curve(d3.curveMonotoneX);  // Smooth curve

const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

g.append("g")
    .attr("class", "axis axis--x")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(x));

g.append("g")
    .attr("class", "axis axis--y")
    .call(d3.axisLeft(y));

let data = [];

const ws = new WebSocket('ws://localhost:6789');
ws.onmessage = function (event) {
    const receivedData = JSON.parse(event.data);
    console.log(receivedData)
    console.log(receivedData._alpha_readings)
    const now = new Date();

    data.push({
        time: now,
        value: getAverageAlphaValue(receivedData._alpha_readings)
    });

    if (data.length > 100) data.shift();  // Limit data points

    x.domain(d3.extent(data, d => d.time));
    // y.domain([d3.min(data, d => d.value), d3.max(data, d => d.value)]);
    y.domain([0, 1]);

    g.select(".axis--x").call(d3.axisBottom(x));
    g.select(".axis--y").call(d3.axisLeft(y));

    g.selectAll(".line").remove();

    g.append("path")
        .datum(data)
        .attr("class", "line")
        .attr("d", line)
        .attr("fill", "none")
        .attr("stroke", "#2982FF")
        .attr("stroke-width", 3);
};


function getAverageAlphaValue(_alpha_readings) {
    let sum = _alpha_readings['TP9']
        + _alpha_readings['AF7']
        + _alpha_readings['AF8']
        + _alpha_readings['TP10'];
    console.log(sum / 4)
    return (sum / 4)
}