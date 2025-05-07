import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

async function draw() {
  const dataset = await d3.json("data.json")

  const days = 365
  const weeks = Math.ceil(days / 7)
  
  const box = 30
  const width = box * weeks
  const height = box * 7
  
  let dimensions = {
    width: width,
    height: height,
  };

  const colorScale = d3.scaleLinear()
  .domain(d3.extent(dataset.map(d => d["workout-duration"])))
  .range(["#ffffff", "#ff0000"])

  const svg = d3.select("#heatmap")
    .append("svg")
    .attr("width", dimensions.width)
    .attr("height", dimensions.height)
    .style("background-color", "gray")
    
  svg.append("g")
    .selectAll("rect")
    .data(dataset)
    .join("rect")
    .attr("width", box - 3)
    .attr("height", box - 3)
    .attr("x", (d, i) => box * ((i / 7) | 0))
    .attr("y", (d, i) => box * ((i % 7)))
    .attr("fill", d => colorScale(d["workout-duration"]))
}

draw()