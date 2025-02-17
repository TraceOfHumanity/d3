import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

const data = [10, 20, 30, 40, 50];

const el = d3.selectAll("li").data(data).join(
  enter => {
    return enter.append("li")
    .style("color", "red")
  },
  update => {
    return update.style("color", "blue")
  },
  exit => exit.remove()
).text(d => d)

console.log(el)