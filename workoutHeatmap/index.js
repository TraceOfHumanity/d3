import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

async function draw() {
  const dataset = await d3.json("data.json")

  //365 days / week
  const days = 365
  const weeks = Math.ceil(days / 7)
  console.log(weeks) 
  
  const box = 30
  const width = box * weeks
  const height = box * 7
  
  let dimensions = {
    width: width,
    height: height,
  };


  const svg = d3.select("#heatmap")
    .append("svg")
    .attr("width", dimensions.width)
    .attr("height", dimensions.height)
    .style("background-color", "gray")
    
}

draw()