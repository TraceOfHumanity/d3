async function draw() {
  // Data
  const dataset = await d3.json('data.json')

  const xAccessor = (d) => d.currently.humidity
  const yAccessor = (d) => d.length

  // Dimensions
  let dimensions = {
    width: 800,
    height: 400,
    margins: 50,
    ctrWidth: 0,
    ctrHeight: 0
  };

  dimensions.ctrWidth = dimensions.width - dimensions.margins * 2
  dimensions.ctrHeight = dimensions.height - dimensions.margins * 2

  // Draw Image
  const svg = d3.select('#chart')
    .append("svg")
    .attr("width", dimensions.width)
    .attr("height", dimensions.height)

  const ctr = svg.append("g") // <g>
    .attr(
      "transform",
      `translate(${dimensions.margins}, ${dimensions.margins})`
    )

  const xScale = d3.scaleLinear()
    .domain(d3.extent(dataset, xAccessor))
    .range([0, dimensions.ctrWidth])
    .nice()

  const bins = d3.bin()
    .domain(xScale.domain())
    .value(xAccessor)
    // .thresholds(d3.range(0, 1, 0.1))
    .thresholds(10)

  const binGroups = bins(dataset)
  const padding = 1

  const yScale = d3.scaleLinear()
    .domain([0, d3.max(binGroups, yAccessor)])
    .range([dimensions.ctrHeight, 0])
    .nice()

  ctr.selectAll("rect")
    .data(binGroups)
    .join("rect")
    .attr("width", d => d3.max([0, xScale(d.x1) - xScale(d.x0) - padding]))
    .attr("height", d => dimensions.ctrHeight - yScale(yAccessor(d)))
    .attr("x", d => xScale(d.x0))
    .attr("y", d => yScale(yAccessor(d)))
    .attr("fill", "#01c5c1")

  ctr.append("g")
    .classed("bar-labels", true)
    .selectAll("text")
    .data(binGroups)
    .join("text")
    .text(d => yAccessor(d))
    .attr("x", d => xScale(d.x0) + (xScale(d.x1) - xScale(d.x0)) / 2)
    .attr("y", d => yScale(yAccessor(d)))
    .attr("text-anchor", "middle")

  const xAxis = d3.axisBottom(xScale)

  const xAxisGroup = ctr.append("g")
    .style("transform", `translateY(${dimensions.ctrHeight}px)`)
    .call(xAxis)

}

draw()