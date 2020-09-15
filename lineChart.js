// Graf nummer 3
const margin1 = {top:65, right:60, bottom:60, left:60};
const width1 = 600;
const height1 = 400;

const chart2 = d3.select("#chart3").append("svg")
            .attr("width", width1 + margin1.left + margin1.right)
            .attr("height",height1 + margin1.top + margin1.bottom)
            .append("g")
            .attr("transform", "translate(" + margin1.left + "," + margin1.top + " )");

const color1 = ["#d53e4f","#fc8d59","#fee08b"];

const xRange = d3.scaleTime().range([0, width1]);
const yRange = d3.scaleLinear().range([height1, 0]); 
const zRange = d3.scaleOrdinal().range(color1);
    



// Deifine the 1st line
const sökande = d3.line()
    .x(function(d) { return xRange(d.år); })
    .y(function(d) { return yRange(d.Sökande); });
    

// Define the 2nd line
const antagna = d3.line()
    .x(function(d) { return xRange(d.år); })
    .y(function(d) { return yRange(d.Antagna); });

const examen = d3.line()
    .x(function(d) { return xRange(d.år); })
    .y(function(d) { return yRange(d.Examen); });    

d3.csv("data.csv",function(error,data){
    if(error) throw error;

    data.forEach(function(d) {
        d.Sökande =+ d.Sökande;
        d.Antagna =+ d.Antagna;
        d.Examen =+ d.Examen;
        d.Ms =+ d.Ms;
        d.Ks =+ d.Ks;
        d.Ma =+ d.Ma;
        d.Ka =+ d.Ks;
        d.Me =+ d.Me;
        d.Ke =+ d.Ke;
    });
    

    var keys1 = data.columns.slice(7);

   // console.log(data)

    xRange.domain(d3.extent(data, function(d) { return d.år; }));
    yRange.domain([0, d3.max(data, function(d) {
        return Math.max(d.Sökande, d.Antagna); })]).nice();
    zRange.domain(keys1);    

      // Add the valueline path.
  chart2.append("path")
  .data([data])
  .attr("class", "line")
  .style("stroke", "#d53e4f")
  .attr("d", sökande)

// Add the valueline2 path.
chart2.append("path")
  .data([data])
  .attr("class", "line")
  .style("stroke", "#fc8d59")
  .attr("d", antagna);
  
chart2.append("path")
  .data([data])
  .attr("class", "line")
  .style("stroke", "#fee08b")
  .attr("d", examen);

  chart2.selectAll("myCircles")
      .data(data)
      .enter()
      .append("circle")
        .attr("class", "dots")
        .attr("fill", "#d53e4f")
        .attr("stroke", "none")
        .attr("cx", function(d) { return xRange(d.år) })
        .attr("cy", function(d) { return yRange(d.Sökande )})
        .attr("r", 3)
        .attr("id","sökande")
        .on("mouseover", handleMouseOver)
        .on("mousemove", handleMouseMove)
        .on("mouseout", handleMouseOut);

chart2.selectAll("myCircles")
        .data(data)
        .enter()
        .append("circle")
          .attr("class", "dots")
          .attr("fill", "#fc8d59")
          .attr("stroke", "none")
          .attr("cx", function(d) { return xRange(d.år) })
          .attr("cy", function(d) { return yRange(d.Antagna )})
          .attr("r", 3)
          .attr("id","antagna")
          .on("mouseover", handleMouseOver)
          .on("mousemove", handleMouseMove)
          .on("mouseout", handleMouseOut);
          
chart2.selectAll("myCircles")
          .data(data)
          .enter()
          .append("circle")
            .attr("class", "dots")
            .attr("fill", "#fee08b")
            .attr("stroke", "none")
            .attr("cx", function(d) { return xRange(d.år) })
            .attr("cy", function(d) { return yRange(d.Examen )})
            .attr("r", 3)
            .attr("id","examen")
            .on("mouseover", handleMouseOver)
            .on("mouseout", handleMouseOut)
            .on("mousemove", handleMouseMove);         

     // Add the X Axis
  chart2.append("g")
  .attr("transform", "translate(0," + height1 + ")")
  .call(d3.axisBottom(xRange).tickFormat(d3.format("d")));    

  chart2.append("text")             
      .attr("x",width/2)
      .attr("y",height + 40)
      .style("text-anchor", "middle")
      .text("År");

    // Add the Y Axis
    chart2.append("g")
    .call(d3.axisLeft(yRange));

    chart2.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x",0 - (height / 2))
      .attr("dy", "1em")
      .attr("font-family", "sans-serif")
      .style("text-anchor", "middle")
      .text("Antal");  
    
      var tooltip1 = chart2.append("g")
      .attr("class", "tooltip")
      .style("display", "none");
        
    tooltip1.append("rect")
      .attr("width", 80)
      .attr("height", 30)
      .attr("fill", "white")
      .style("opacity", 1)
      .attr("stroke-width", 0.5)
      .attr("stroke", "black")
    
    tooltip1.append("text")
      .attr("x", 40)
      .attr("y", 5)
      .attr("dy", "1.2em")
      .style("text-anchor", "middle")
      .attr("font-family", "sans-serif")
      .attr("font-size", "12px")
      .attr("font-weight", "bold");

    var legend1 = chart2.append("g")
    .attr("font-family", "sans-serif")
    .attr("font-size", 10)
    .attr("text-anchor", "end")
    .selectAll("g")
    .data(keys1.slice().reverse())
    .enter().append("g")
    .attr("transform", function(d, i) { return "translate(40," + i * 20 +  ")"; })
    .append("g").attr("transform","translate(-40,-45)");

    legend1.append("rect")
        .attr("x", width1 - 22) 
        .attr("width", 19)
        .attr("height", 19)
        .attr("fill", zRange);

    legend1.append("text")
        .attr("x", width1 - 30)
        .attr("y", 9.5)
        .attr("dy", "0.32em")
        .text(function(d) { return d; });    

    var title = chart2.append("g")
        .attr("font-family", "sans-serif")
        .attr("font-size", 16)
        .attr("text-anchor", "middle")
        .append("text")
        .text("Civilingenjör Medieteknik Linköpings Universitet")
        .attr("x", width1/2)
        .attr("y", -25);


    function handleMouseOver(d,i){
        d3.select(this)
        .attr("r", 8);
        tooltip1.style("display",null)
      //  console.log(d);
    }

    function handleMouseOut(d,i){
        d3.select(this)
        .attr("r",3);
        tooltip1.style("display", "none")
    }

    function handleMouseMove(d,data){
        d3.select(this)
      //  console.log(d3.select(this).attr("id"))
      //  console.log(typeof d3.select(this).attr("id"))
        var xPosition = d3.mouse(this)[0] - 25;
        var yPosition = d3.mouse(this)[1] - 65;

  
            tooltip1.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
            if (d3.select(this).attr("id") === "sökande"){
              tooltip1.select("text").text("Sökande: " + d.Sökande)
            }
            if (d3.select(this).attr("id") === "antagna"){
              tooltip1.select("text").text("Antagna: " + d.Antagna)
            }
            if (d3.select(this).attr("id") === "examen"){
              tooltip1.select("text").text("Examen: " + d.Examen)
            }
      }

})