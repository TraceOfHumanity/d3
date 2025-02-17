import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

async function loadData() {
  const data = await d3.json("data.json")
  console.log(data)
}

loadData()