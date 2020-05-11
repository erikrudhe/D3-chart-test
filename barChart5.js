const margin5 = {top:80, right:50, bottom:40, left:30};
const width5 = 600;
const height5 = 400;

const chart5 = d3.select("#chart5").append("svg")
            .attr("width", width5 + margin5.left + margin5.right)
            .attr("height",height5 + margin5.top + margin5.bottom)
            .append("g")
            .attr("transform", "translate(" + margin5.left + "," + margin5.top + " )");

const color5 = ['#d53e4f','#cf3445','#fee08b'];