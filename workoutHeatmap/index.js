import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

async function draw() {
  const dataset = await d3.json("data.json")
  
  const fullYearData = Array(365).fill().map((_, index) => {
    const currentDate = new Date(2024, 0, index + 1)
    const dateString = currentDate.toISOString().split('T')[0]
    
    const dayData = dataset.find(d => d["workout-date"] === dateString)
    
    return dayData || {
      "workout-date": dateString,
      "workout-duration": 0
    }
  })

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
    .attr("transform", "translate(1,1)")
    .attr('stroke', 'black')
    .selectAll("rect")
    .data(fullYearData)
    .join("rect")
    .attr("width", box - 2)
    .attr("height", box - 2)
    .attr('rx', 4)
    .attr("x", (d, i) => box * ((i / 7) | 0))
    .attr("y", (d, i) => box * ((i % 7)))
    .attr("fill", d => colorScale(d["workout-duration"]))
    .attr("data-date", d => d["workout-date"])
    .attr("data-duration", d => d["workout-duration"])
}

draw()