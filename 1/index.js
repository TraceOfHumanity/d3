import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

const pD3 = d3.select("body").append("p").text("hello d3!").attr("class", "d3-text");

console.log(pD3)