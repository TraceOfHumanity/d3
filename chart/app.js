// import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

async function draw() {
  // Data
  const dataset = await d3.json('data.json')

  const sizeAccessor = (d) => d.size
  const nameAccessor = (d) => d.name

  // Dimensions
  let dimensions = {
    width: 200,
    height: 500,
    margin: 50
  };

  // Draw Image
  const svg = d3.select('#chart')
    .append("svg")
    .attr("width", dimensions.width)
    .attr("height", dimensions.height)

  const universalScale = d3.scaleLog()
    .domain(d3.extent(dataset, sizeAccessor))
    .range([dimensions.height - dimensions.margin, dimensions.margin])

  const circlesGroup = svg.append('g')
    .style('font-size', '18px')
    .style('dominant-baseline', 'middle')

  circlesGroup.selectAll('circle')
    .data(dataset)
    .join('circle')
    .attr('cx', dimensions.margin)
    .attr('cy', d => universalScale(sizeAccessor(d)))
    .attr('r', 6)

  circlesGroup.selectAll('text')
    .data(dataset)
    .join('text')
    .attr('x', dimensions.margin + 15)
    .attr('y', d => universalScale(sizeAccessor(d)))
    .text(nameAccessor)

  const axis = d3.axisLeft(universalScale)

  svg.append('g')
    .attr('transform', `translate(${dimensions.margin}, 0)`)
    .call(axis)
}

draw()