import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

async function draw(el, scale) {
  // Data
  const dataset = await d3.json('data.json')
  dataset.sort((a, b) => a - b)

  // Dimensions
  let dimensions = {
    width: 600,
    height: 150,
  };

  const box = 30

  // Draw Image
  const svg = d3.select(el)
    .append("svg")
    .attr("width", dimensions.width)
    .attr("height", dimensions.height)

  let colorScale
  if (scale === "linear") {
    colorScale = d3.scaleLinear()
      .domain(d3.extent(dataset))
      .range(["#ffffff", "#ff0000"])
  }

  svg.append('g')
    .attr('transform', 'translate(2,2)')
    .attr('stroke', 'black')
    // .attr('fill', '#ddd')
    .selectAll('rect')
    .data(dataset)
    .join('rect')
    .attr('width', box - 3)
    .attr('height', box - 3)
    .attr('x', (d, i) => box * (i % 20))
    .attr('y', (d, i) => box * ((i / 20) | 0))
    .attr('fill', d => colorScale(d))
}

draw('#heatmap1', "linear")