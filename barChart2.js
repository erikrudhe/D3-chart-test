const margin3 = {top:80, right:50, bottom:40, left:30};
const width3 = 600;
const height3 = 400;

const chart3 = d3.select("#chart1").append("svg")
            .attr("width", width3 + margin3.left + margin3.right)
            .attr("height",height3 + margin3.top + margin3.bottom)
            .append("g")
            .attr("transform", "translate(" + margin3.left + "," + margin3.top + " )");

const color3 = ['#cf3445','#cf3445','#fee08b'];
//const color3 = ["#d53e4f","#d41c30","#ad0719"]

const x3 = d3.scaleBand()
    .rangeRound([0, width3])
    .paddingInner(0.03)
    .align(0.1);

const y3 = d3.scaleLinear()
    .rangeRound([height3,0]);
    
const z3 = d3.scaleOrdinal()
    .range(color3);
    

d3.csv("data.csv", function(d,i,columns){
    for(i = 1, t = 0; i < columns.length; ++i) t += d[columns[i]] = +d[columns[i]];
    d.total = t;
    return d;
}, function(error,data){
    if (error) throw error;     


 //   console.log(data);

    const newData = data.map(item =>{
      item.Sökande = item.Sökande - item.Antagna
    })

    var keys3 = data.columns.slice(1);

    

     // Sortera staplarna i storleksordning data.sort(function(a,b){ return b.total - a.total});
      x3.domain(data.map(function(d){ return d.år}));
      y3.domain([0, d3.max(data, function(d) { return d.total; })]).nice();
      z3.domain(keys3);

      var data1 = d3.stack().keys(keys3)(data);

      

      for(var i = 0; i < data1.length; i++){
        for(var j = 0; j < data1[i].length; j++){
          for(var k = 0; k < data1[i][k].length; k++){
            //console.log(data1[i][k])
            data1[i][j].id = i + 1
          }
        }
      }

    //  console.log(data1)
  
      var bars3 = chart3.append("g")
      .selectAll("g")
      .data(data1)
      .enter().append("g")
        .attr("fill", function(d) { return z3(d.key); })
      .selectAll("rect")
      .data(function(d) { return d; })
      .enter().append("rect")
        .attr("x", function(d) { return x3(d.data.år); })
        .attr("y", function(d) { return y3(d[1]); })
        .attr("height", function(d) { return y3(d[0]) - y3(d[1]); })
        .attr("width", x3.bandwidth())
        .attr("class","bars3")
        .classed("highlightedBar", function(d){ if (d.id ===  2  ){return true} else return false})
        .on("mouseover", handleMouseOver)
        .on("mouseout", handleMouseOut)
        .on("mousemove",handleMouseMove)
        .attr("id",function(d,i){return  i})
        
      //  console.log( document.querySelector('rect').__data__ )
         

       
       // console.log(data);

        chart3.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0," + height3 + ")")
        .call(d3.axisBottom(x3));
  
        chart3.append("g")
        .attr("class", "axis")
        .call(d3.axisLeft(y3).ticks(null, "s"))
        .append("text")
        .attr("x", 2)
        .attr("y", y3(y3.ticks().pop()) + 0.5)
        .attr("dy", "0.32em")
        .attr("fill", "#000")
        .attr("font-weight", "bold")
        .attr("text-anchor", "start");
  
  
        var legend3 = chart3.append("g")
        .attr("font-family", "sans-serif")
        .attr("font-size", 10)
        .attr("text-anchor", "end")
        .selectAll("g")
        .data(keys3.slice().reverse())
        .enter().append("g")
        .attr("transform", function(d, i) { return "translate(40," + i * 20 +  ")"; })
        .append("g").attr("transform","translate(-40,-60)");
  
        legend3.append("rect")
            .attr("x", width3 - 22) 
            .attr("width", 19)
            .attr("height", 19)
            .attr("fill", z3);
  
        legend3.append("text")
            .attr("x", width3 - 30)
            .attr("y", 9.5)
            .attr("dy", "0.32em")
            .text(function(d) { return d; });
  
        var title3 = chart3.append("g")
          .attr("font-family", "sans-serif")
          .attr("font-size", 20)
          .attr("text-anchor", "middle")
          .append("text")
          .text("Civilingenjör Medieteknik Liu")
          .attr("x", width3/2)
          .attr("y", -25);
         
        var tooltip3 = chart3.append("g")
          .attr("class", "tooltip")
          .style("display", "none");
            
        tooltip3.append("rect")
          .attr("width", 80)
          .attr("height", 30)
          .attr("fill", "white")
          .style("opacity", 1)
          .attr("stroke-width", 0.5)
          .attr("stroke", "black")
        
        tooltip3.append("text")
          .attr("x", 40)
          .attr("y", 5)
          .attr("dy", "1.2em")
          .style("text-anchor", "middle")
          .attr("font-family", "sans-serif")
          .attr("font-size", "12px")
          .attr("font-weight", "bold");
  
  
  
        function handleMouseOver(d,key){
          d3.select(this)
          console.log(this)
          console.log(d)
          console.log( this.id)

          if(d.id === 1 && this.id === "0"){
            chart3.selectAll("rect[id='0']").attr("fill", function(d) {if (d.id === 2 ){ return "steelblue"} else return false})
          }

          if(d.id === 1 && this.id === "1"){
          chart3.selectAll("rect[id='1']").attr("fill", function(d) {if (d.id === 2 ){ return "steelblue"} else return false})
          }

          if(d.id === 1 && this.id === "2"){
          chart3.selectAll("rect[id='2']").attr("fill", function(d) {if (d.id === 2 ){ return "steelblue"} else return false})  
          }

          if(d.id === 1 && this.id === "3"){
          chart3.selectAll("rect[id='3']").attr("fill", function(d) {if (d.id === 2 ){ return "steelblue"} else return false})
          }

          if(d.id === 1 && this.id === "4"){
          chart3.selectAll("rect[id='4']").attr("fill", function(d) {if (d.id === 2 ){ return "steelblue"} else return false})  
          }

          if(d.id === 1 && this.id === "5"){
          chart3.selectAll("rect[id='5']").attr("fill", function(d) {if (d.id === 2 ){ return "steelblue"} else return false})
          }

          if(d.id === 1 && this.id === "6"){
          chart3.selectAll("rect[id='6']").attr("fill", function(d) {if (d.id === 2 ){ return "steelblue"} else return false})
          }

          if(d.id === 1 && this.id === "7"){
          chart3.selectAll("rect[id='7']").attr("fill", function(d) {if (d.id === 2 ){ return "steelblue"} else return false})
          }

          if(d.id === 1 && this.id === "8"){
          chart3.selectAll("rect[id='8']").attr("fill", function(d) {if (d.id === 2 ){ return "steelblue"} else return false})    
          }

          if(d.id === 1 && this.id === "9"){
          chart3.selectAll("rect[id='9']").attr("fill", function(d) {if (d.id === 2 ){ return "steelblue"} else return false})
          }
          
          if(d.id === 1 && this.id === "10"){
          chart3.selectAll("rect[id='10']").attr("fill", function(d) {if (d.id === 2 ){ return "steelblue"} else return false})
          }
          tooltip3.style("display",null)
        }
  
        function handleMouseOut(d,i){
            d3.select(this)
            if(d.id === 1 && this.id === "0"){
            chart3.selectAll("rect[id='0']").attr("fill", function(d) {if (d.id === 2 ){ return "#cf3445"} else return false})
          }

          if(d.id === 1 && this.id === "1"){
            chart3.selectAll("rect[id='1']").attr("fill", function(d) {if (d.id === 2 ){ return "#cf3445"} else return false})  
          }

          if(d.id === 1 && this.id === "2"){
            chart3.selectAll("rect[id='2']").attr("fill", function(d) {if (d.id === 2 ){ return "#cf3445"} else return false})  
          }

          if(d.id === 1 && this.id === "3"){
            chart3.selectAll("rect[id='3']").attr("fill", function(d) {if (d.id === 2 ){ return "#cf3445"} else return false})
          }

          if(d.id === 1 && this.id === "4"){
            chart3.selectAll("rect[id='4']").attr("fill", function(d) {if (d.id === 2 ){ return "#cf3445"} else return false})
          }

          if(d.id === 1 && this.id === "5"){
            chart3.selectAll("rect[id='5']").attr("fill", function(d) {if (d.id === 2 ){ return "#cf3445"} else return false})
          }

          if(d.id === 1 && this.id === "6"){
            chart3.selectAll("rect[id='6']").attr("fill", function(d) {if (d.id === 2 ){ return "#cf3445"} else return false})
          }

          if(d.id === 1 && this.id === "7"){
            chart3.selectAll("rect[id='7']").attr("fill", function(d) {if (d.id === 2 ){ return "#cf3445"} else return false}) 
          }

          if(d.id === 1 && this.id === "8"){
            chart3.selectAll("rect[id='8']").attr("fill", function(d) {if (d.id === 2 ){ return "#cf3445"} else return false})
          }

          if(d.id === 1 && this.id === "9"){
            chart3.selectAll("rect[id='9']").attr("fill", function(d) {if (d.id === 2 ){ return "#cf3445"} else return false})
          }

          if(d.id === 1 && this.id === "10"){
            chart3.selectAll("rect[id='10']").attr("fill", function(d) {if (d.id === 2 ){ return "#cf3445"} else return false})
          }
            tooltip3.style("display", "none")
        }
  
        function handleMouseMove(d,i){
          
        //  console.log(d3.select(this).attr("id"))
         // console.log(typeof d3.select(this).attr("id"))
        // console.log(typeof d3.select(this));
       // console.log( document.querySelector('rect').__data__ )
          var xPosition = d3.mouse(this)[0] - 25;
          var yPosition = d3.mouse(this)[1] - 55;
              tooltip3.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
              if(d.id === 1){
                tooltip3.select("text").text( "Sökande: " + (d[1] - d[0] + d.data.Antagna) );
              }
              else if (d.id === 2 ){
                tooltip3.select("text").text( "Antagna: " + (d[1] - d[0]) );
              }else{
                tooltip3.select("text").text( "Examen: " + (d[1] - d[0]) );
              }
        }


});    