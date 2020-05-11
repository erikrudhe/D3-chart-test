const margin = {top:80, right:50, bottom:40, left:30};
const width = 600;
const height = 400;

const chart1 = d3.select("#chart1").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height",height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + " )");

const color = ['#d53e4f','#fc8d59','#fee08b'];

const x = d3.scaleBand()
    .rangeRound([0, width])
    .paddingInner(0.02)
    .align(0.1);

const y = d3.scaleLinear()
    .rangeRound([height,0]);
    
const z = d3.scaleOrdinal()
    .range(color);

    
d3.csv("data.csv", function(d,i,columns){
    for(i = 1, t = 0; i < columns.length; ++i) t += d[columns[i]] = +d[columns[i]];
    d.total = t;
    return d;
}, function(error,data){
    if (error) throw error; 

    data.forEach((d,i) => {
      d.id  = i +1;     
    });

  //  console.log(data)


    var keys = data.columns.slice(1);

  //  console.log(data.key)
   
   // data.sort(function(a,b){ return b.total - a.total});
    x.domain(data.map(function(d){ return d.år}));
    y.domain([0, d3.max(data, function(d) { return d.total; })]).nice();
    z.domain(keys);

    var bars = chart1.append("g")
    .selectAll("g")
    .data(d3.stack().keys(keys)(data))
    .enter().append("g")
    .attr("id",function(d,i){
      return data[d];
  })
      .attr("fill", function(d) { return z(d.key); })
    .selectAll("rect")
    .data(function(d) { return d; })
    .enter().append("rect")
      .attr("x", function(d) { return x(d.data.år); })
      .attr("y", function(d) { return y(d[1]); })
      .attr("height", function(d) { return y(d[0]) - y(d[1]); })
      .attr("width", x.bandwidth())
      .attr("class","hej")
      .on("mouseover", handleMouseOver)
      .on("mouseout", handleMouseOut)
      .on("mousemove",handleMouseMove)
      
        
        chart1.selectAll("text")
        .data(data)
        .enter()
        .append("text")
        .attr("text-anchor", "middle")
        .attr("font-family", "sans-serif")
        .attr("font-size", 11)
        .attr("y", function(d){ return y(d.total) -4})
        .attr("x",function(d,i){return i * (width /data.length ) + (width / data.length - 30) })
        .text(function(d){ return d.total})

          // (x.bandwidth()/2)

      chart1.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

      chart1.append("g")
      .attr("class", "axis")
      .call(d3.axisLeft(y).ticks(null, "s"))
      .append("text")
      .attr("x", 2)
      .attr("y", y(y.ticks().pop()) + 0.5)
      .attr("dy", "0.32em")
      .attr("fill", "#000")
      .attr("font-weight", "bold")
      .attr("text-anchor", "start");


      var legend = chart1.append("g")
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
      .attr("text-anchor", "end")
      .selectAll("g")
      .data(keys.slice().reverse())
      .enter().append("g")
      .attr("transform", function(d, i) { return "translate(40," + i * 20 +  ")"; })
      .append("g").attr("transform","translate(-40,-60)");

      legend.append("rect")
          .attr("x", width - 22) 
          .attr("width", 19)
          .attr("height", 19)
          .attr("fill", z);

      legend.append("text")
          .attr("x", width - 30)
          .attr("y", 9.5)
          .attr("dy", "0.32em")
          .text(function(d) { return d; });

      var title = chart1.append("g")
        .attr("font-family", "sans-serif")
        .attr("font-size", 20)
        .attr("text-anchor", "middle")
        .append("text")
        .text("Civilingenjör Medieteknik Liu")
        .attr("x", width/2)
        .attr("y", -25);
       
      var tooltip = chart1.append("g")
        .attr("class", "tooltip")
        .style("display", "none");
          
      tooltip.append("rect")
        .attr("width", 30)
        .attr("height", 20)
        .attr("fill", "white")
        .style("opacity", 0.5);
      
      tooltip.append("text")
        .attr("x", 15)
        .attr("dy", "1.2em")
        .style("text-anchor", "middle")
        .attr("font-family", "sans-serif")
        .attr("font-size", "12px")
        .attr("font-weight", "bold");



      function handleMouseOver(d,key){
        d3.select(this) //.attr("fill", "black")
        tooltip.style("display",null)
        
     //   console.log("mouseOver", d,key)
      }

      function handleMouseOut(d,i){
          d3.select(this)
          tooltip.style("display", "none")
      }

      function handleMouseMove(d,i){
        d3.select(this)
        var xPosition = d3.mouse(this)[0] - 25;
        var yPosition = d3.mouse(this)[1] - 35;
            tooltip.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
            tooltip.select("text").text(d[1] - d[0], d[1]);
           
      }
})    