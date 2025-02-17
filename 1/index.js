import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

async function draw(){
  const data = await d3.json("data.json")

  const dimensions = {
    width: 800,
    height: 800,

  }

  const svg = d3.select("#chart")
    .append("svg")
    .attr("width", dimensions.width)
    .attr("height", dimensions.height)

  // const xScale = d3.scaleLinear()
  //   .domain([0, d3.max(data, d => d.age)])
  //   .range([0, dimensions.width])
    
}

draw()