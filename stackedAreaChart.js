const margin4 = {top:80, right:60, bottom:40, left:30};
const width4 = 600;
const height4 = 400;

const chart4 = d3.select("#chart4").append("svg")
            .attr("width", width4 + margin4.left + margin4.right)
            .attr("height",height4 + margin4.top + margin4.bottom)
            .append("g")
            .attr("transform", "translate(" + margin4.left + "," + margin4.top + " )");

const color4 = ["#d53e4f","#fc8d59","#fee08b"];

var parseTime = d3.timeParse("%Y")
bisectDate = d3.bisector(function(d) { return d.år; }).left;

const x4 = d3.scaleTime().range([0, width4]);
const y4 = d3.scaleLinear().range([height4, 0]);
const z4 = d3.scaleOrdinal().range(color4);

// define the area
var areaSökande = d3.area()
    .x(function(d) { return x4(d.år); })
    .y0(height4)
    .y1(function(d) { return y4(d.Sökande); });

var areaAntagna = d3.area()
    .x(function(d) { return x4(d.år); })
    .y0(height4)
    .y1(function(d) { return y4(d.Antagna); });    

var areaExamen = d3.area()
    .x(function(d) { return x4(d.år); })
    .y0(height4)
    .y1(function(d) { return y4(d.Examen); });    

// Deifine the 1st line
const sökande4 = d3.line()
    .x(function(d) { return x4(d.år); })
    .y(function(d) { return y4(d.Sökande); });
    

// Define the 2nd line
const antagna4 = d3.line()
    .x(function(d) { return x4(d.år); })
    .y(function(d) { return y4(d.Antagna); });

const examen4 = d3.line()
    .x(function(d) { return x4(d.år); })
    .y(function(d) { return y4(d.Examen); });

   

    
d3.csv("data.csv",function(error,data){
    if(error) throw error;

    data.forEach(function(d) {
        d.Sökande =+ d.Sökande;
        d.Antagna =+ d.Antagna;
        d.Examen =+ d.Examen;
     //   d.år = parseTime(d.år);
    });
  
    var keys4 = data.columns.slice(1);

    // Set the domain for 
    x4.domain(d3.extent(data,function(d){return d.år}));
    y4.domain([0, d3.max(data, function(d) {
        return Math.max(d.Sökande, d.Antagna); })]).nice();
    z4.domain(keys4)    

    // Add the axises
   var xAxis =  chart4.append("g")
    .attr("transform", "translate(0," + height4 + ")")
    .call(d3.axisBottom(x4).tickFormat(d3.format("d")));    

    // Add the Y Axis
   var yAxis =  chart4.append("g")
    .call(d3.axisLeft(y4));

   chart4.append("path")
   .data([data])
   .attr("class", "area")
   .attr("fill","#d53e4f" )
   .attr("d", areaSökande) 

    // add the valueline path.
   chart4.append("path")
    .data([data])
    .attr("class", "line")
    .style("stroke", "#d53e4f")
    .attr("d", sökande4);

    chart4.selectAll("myCircles")
      .data(data)
      .enter()
      .append("circle")
        .attr("class", "dots")
        .attr("fill", "#d53e4f")
        .attr("stroke", "none")
        .attr("cx", function(d) { return x4(d.år) })
        .attr("cy", function(d) { return y4(d.Sökande )})
        .attr("r", 20)
        .style("opacity", 0)
        .attr("id","sökande")
        .on("mouseover", handleMouseOver)
        .on("mousemove", handleMouseMove)
        .on("mouseout", handleMouseOut);

    chart4.append("path")
    .data([data])
    .attr("class", "area")
    .attr("fill","#fc8d59" )
    .attr("d", areaAntagna)

    chart4.append("path")
    .data([data])
    .attr("class", "line")
    .style("stroke", "#fc8d59")
    .attr("d", antagna4);

    chart4.selectAll("myCircles")
    .data(data)
    .enter()
    .append("circle")
      .attr("class", "dots")
      .attr("fill", "#d53e4f")
      .attr("stroke", "none")
      .attr("cx", function(d) { return x4(d.år) })
      .attr("cy", function(d) { return y4(d.Antagna )})
      .attr("r", 20)
      .style("opacity", 0)
      .attr("id","antagna")
      .on("mouseover", handleMouseOver)
      .on("mousemove", handleMouseMove)
      .on("mouseout", handleMouseOut);   

    chart4.append("path")
    .data([data])
    .attr("class", "area")
    .attr("fill","#fee08b" )
    .attr("d", areaExamen)

    chart4.append("path")
    .data([data])
    .attr("class", "line")
    .style("stroke", "#fee08b")
    .attr("d", examen4);

    chart4.selectAll("myCircles")
    .data(data)
    .enter()
    .append("circle")
      .attr("class", "dots")
      .attr("fill", "#d53e4f")
      .attr("stroke", "none")
      .attr("cx", function(d) { return x4(d.år) })
      .attr("cy", function(d) { return y4(d.Examen )})
      .attr("r", 20)
      .style("opacity", 0)
      .attr("id","examen")
      .on("mouseover", handleMouseOver)
      .on("mousemove", handleMouseMove)
      .on("mouseout", handleMouseOut);   

    var legend4 = chart4.append("g")
    .attr("font-family", "sans-serif")
    .attr("font-size", 10)
    .attr("text-anchor", "end")
    .selectAll("g")
    .data(keys4.slice().reverse())
    .enter().append("g")
    .attr("transform", function(d, i) { return "translate(40," + i * 20 +  ")"; })
    .append("g").attr("transform","translate(-40,-45)");

    legend4.append("rect")
        .attr("x", width4 - 22) 
        .attr("width", 19)
        .attr("height", 19)
        .attr("fill", z4);

    legend4.append("text")
        .attr("x", width4 - 30)
        .attr("y", 9.5)
        .attr("dy", "0.32em")
        .text(function(d) { return d; });   
    
        var title4 = chart4.append("g")
        .attr("font-family", "sans-serif")
        .attr("font-size", 20)
        .attr("text-anchor", "middle")
        .append("text")
        .text("Civilingenjör Medieteknik Liu")
        .attr("x", width4/2)
        .attr("y", -25);    

        var tooltip4 = chart4.append("g")
          .attr("class", "tooltip")
          .style("display", "none");
            
        tooltip4.append("rect")
          .attr("width", 80)
          .attr("height", 30)
          .attr("fill", "white")
          .style("opacity", 1)
          .attr("stroke-width", 0.5)
          .attr("stroke", "black")
        
        tooltip4.append("text")
          .attr("x", 40)
          .attr("y", 5)
          .attr("dy", "1.2em")
          .style("text-anchor", "middle")
          .attr("font-family", "sans-serif")
          .attr("font-size", "12px")
          .attr("font-weight", "bold");

      /*
          var focus = chart4.append("g")
            .attr("class", "focus")
            .style("display", "none");

          focus.append("line")
              .attr("class", "x-hover-line hover-line")
              .attr("y1", 0)
              .attr("y2", height4);

          focus.append("line")
              .attr("class", "y-hover-line hover-line")
              .attr("x1", width4)
              .attr("x2", width4);

          focus.append("circle")
              .attr("r", 7.5);

          focus.append("text")
              .attr("x", 15)
              .attr("dy", ".31em");

          chart4.append("rect")
          //  .attr("transform", "translate(" + (margin4.left -30) + "," + (margin4.top -70) + ")")
            .attr("class", "overlay")
            .attr("width", width4)
            .attr("height", height4)
            .on("mouseover", function() { focus.style("display", null); })
            .on("mouseout", function() { focus.style("display", "none"); })
            .on("mousemove", mousemove);   

            
            function mousemove() {
              var x0 = x4.invert(d3.mouse(this)[0]),
                  i = bisectDate(data, x0, 1) ,
                  d0 = data[i -1],
                  d1 = data[i],
                  d = x0 - d0.år > d1.år - x0 ? d1 : d0;
                  //console.log(d0)
              focus.attr("transform", "translate(" + x(d.år) + "," + y(d.Sökande) +  ")");
              focus.select("text").text(function() { return d.Sökande; });
              focus.select(".x-hover-line").attr("y2", height4 - y(d.Sökande) );
            }

        */    
            function handleMouseOver(d,i){
                d3.select(this)
                tooltip4.style("display",null)
            }
        
            function handleMouseOut(d,i){
                d3.select(this)
                tooltip4.style("display", "none")
            }
        
            function handleMouseMove(d,data){
                d3.select(this)
              //  console.log(d3.select(this).attr("id"))
              //  console.log(typeof d3.select(this).attr("id"))
                var xPosition = d3.mouse(this)[0] - 25;
                var yPosition = d3.mouse(this)[1] - 35;
        
          
                    tooltip4.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
                    if (d3.select(this).attr("id") === "sökande"){
                      tooltip4.select("text").text( "Sökande: " + d.Sökande)
                    }
                    if (d3.select(this).attr("id") === "antagna"){
                      tooltip4.select("text").text("Antagna: " + d.Antagna)
                    }
                    if (d3.select(this).attr("id") === "examen"){
                      tooltip4.select("text").text("Examen: "+d.Examen)
                    }
        
              }
                    

})