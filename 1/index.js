import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

async function draw() {
  const data = await d3.json("data.json")

  const xAccessor = d => d.currently.humidity
  const yAccessor = d => d.currently.apparentTemperature

  const dimensions = {
    width: 800,
    height: 800,
    margin: {
      top: 50,
      right: 50,
      bottom: 50,
      left: 50
    },
    ctrWidth: 0,
    ctrHeight: 0
  }

  dimensions.ctrWidth = dimensions.width - dimensions.margin.left - dimensions.margin.right
  dimensions.ctrHeight = dimensions.height - dimensions.margin.top - dimensions.margin.bottom


  const svg = d3.select("#chart")
    .append("svg")
    .attr("width", dimensions.width)
    .attr("height", dimensions.height)

  const ctr = svg.append("g")
    .attr("transform", `translate(${dimensions.margin.left}, ${dimensions.margin.top})`)


  const xScale = d3.scaleLinear()
    .domain(d3.extent(data, xAccessor))
    .rangeRound([0, dimensions.ctrWidth])
    .clamp(true)

  const yScale = d3.scaleLinear()
    .domain(d3.extent(data, yAccessor))
    .rangeRound([dimensions.ctrHeight, 0])
    .clamp(true)

  ctr.selectAll("circle")
    .data(data)
    .join("circle")
    .attr("cx", d => xScale(xAccessor(d)))
    .attr("cy", d => yScale(yAccessor(d)))
    .attr("r", 5)
    .attr("fill", "red")

  const xAxis = d3.axisBottom(xScale)
    .ticks(10)
    .tickFormat(d => d + "%")

  ctr.append("g")
    .attr("transform", `translate(0, ${dimensions.ctrHeight})`)
    .call(xAxis)
    

}

draw()