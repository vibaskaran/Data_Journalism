




function setOriginalAxisData(xAxisParam, yAxisParam){


  console.log("X Axis: ", xAxisParam);
  console.log("Y Axis: ", yAxisParam);
  

  // Define SVG area dimensions
var svgWidth = 800;
var svgHeight = 600;

// Define the chart's margins as an object
var margin = {
  top: 60,
  right: 60,
  bottom: 100,
  left: 160
};

// Define dimensions of the chart area
var chartWidth = svgWidth - margin.left - margin.right;
var chartHeight = svgHeight - margin.top - margin.bottom;



// Select body, append SVG area to it, and set its dimensions
var svg = d3
  .select("body")
    .append("svg")
      .attr("width", svgWidth)
      .attr("height", svgHeight)
      // Append a group area, then set its margins
      .append("g")
        .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");



factorY = 1;
yLabel1 = "Lacks Healthcare (%)";
yLabel2 = "Smokes (%)";
yLabel3 = "Obese (%)";
xLabel1 = "In Poverty (%)";
xLabel2 = "Age (Median)";
xLabel3 = "Household Income (Median)";

if(xAxisParam == "age"){
  factorX = 1;
};
if(xAxisParam == "poverty"){
  factorX = 1;
};
if(xAxisParam == "income"){
  factorX = 1000;
};

// Load data from forcepoints.csv
d3.csv("/static/data.csv", function(error, csvData) {

  minX1 = d3.min(csvData, function(data) {
    data[xAxisParam] = parseFloat(data[xAxisParam]);
    return data[xAxisParam];
  }) - (1*factorX) ;
  minY1 = d3.min(csvData, function(data) {
    data[yAxisParam] = parseFloat(data[yAxisParam]);
    return data[yAxisParam];
  }) - (0.5*factorY);
  maxX1 = d3.max(csvData, function(data) {
    data[xAxisParam] = parseFloat(data[xAxisParam]);
    return data[xAxisParam];
  }) + (1.5*factorX);
  maxY1 = d3.max(csvData, function(data) {
    data[yAxisParam] = parseFloat(data[yAxisParam]);
    return data[yAxisParam];
  }) + (1*factorY) ;
  console.log("first:"+"minX:"+minX1+";maxX:"+maxX1+"minY:"+minY1+";maxY:"+maxY1);
  console.log("Testing3");
  
  // Throw an error if one occurs
  if (error) throw error;

  // Print the csvData
  console.log(csvData);

  d3.selectAll("circle").remove();

  // Format the date and cast the force value to a number
  csvData.forEach(function(data) {
    
    var node = d3.select("svg").append('g');
    var xLoc = (chartWidth) - (chartWidth * (((((maxX1-minX1)) - (data[xAxisParam]-minX1) ))/(maxX1-minX1))) + margin.left;
    var yLoc = (chartHeight) - (chartHeight * 1/(maxY1-minY1) * (data[yAxisParam] - minY1)  ) + margin.top

    var d = data;
    console.log(d.state);
    node
      .append("circle")
        .attr("class", "circle")
        .attr("cx", xLoc)
        .attr("cy", yLoc)
        .attr("r", 12)
        .style("fill", "lightblue" )
      .append("title")
        .attr("text-anchor","middle")
        .text(data['state']+"\n"+'------------------'+"\n"+xAxisParam+": "+data[xAxisParam]+"\n"+yAxisParam+": "+data[yAxisParam])
        
    node
      .append("text")
        .attr("text-anchor", "middle")
        .style("fill","white")
        .attr("x", xLoc)
        .attr("y", yLoc+5)
        .text(data.abbr)
  
    
  });


  // Configure a linear scale with a range between 0 and the chartWidth
  var xLinearScale = d3.scaleLinear().range([0, chartWidth]);
  

  // Configure a linear scale with a range between the chartHeight and 0
  var yLinearScale = d3.scaleLinear().range([chartHeight, 0]);

  // Set the domain for the xLinearScale function
  xLinearScale.domain([ minX1, maxX1]);
  
  // Set the domain for the xLinearScale function
  yLinearScale.domain([ minY1, maxY1 ]);

  // Create two new functions passing the scales in as arguments
  // These will be used to create the chart's axes
  var bottomAxis = d3.axisBottom(xLinearScale);
  var leftAxis = d3.axisLeft(yLinearScale);

  // Append an SVG group element to the SVG area, create the left axis inside of it
  svg.append("g")
    .attr("class", "y-axis")
    .call(leftAxis);

  // Append an SVG group element to the SVG area, create the bottom axis inside of it
  // Translate the bottom axis to the bottom of the page
  svg.append("g")
    .attr("class", "x-axis")
    .attr("transform", "translate(0, " + chartHeight + ")")
    .call(bottomAxis);

  svg
    .append("g")
      .attr("transform", "translate(0, " + chartHeight + ")")
    .append("text")
      .attr("text-anchor","middle")
      .attr("class", "healthcare")
      .attr("transform","rotate(-90)")
      .attr("x", svgHeight/3)
      .attr("y", -svgWidth/20)
      .style("font-weight", 'bold')
      .style("fill", 'blue')
      .on("click", function () {
        console.log("testing111");
        setUpdatedAxisData(xAxisParam, "healthcare", svg);
      })
      .text(yLabel1);
      
 
  svg
    .append("g")
      .attr("transform", "translate(0, " + chartHeight + ")")
    .append("text")
      .attr("text-anchor","middle")
      .attr("class", "smokes")
      .attr("transform","rotate(-90)")
      .attr("x", svgHeight/3)
      .attr("y", -(svgWidth/20 + (margin.left/8)))
      .style("font-weight", 'bold')
      .style("fill", 'black')
      .on("click", function () {
        console.log("testing222");
        setUpdatedAxisData(xAxisParam, "smokes", svg);
      })
      .text(yLabel2);

  svg
    .append("g")
      .attr("transform", "translate(0, " + chartHeight + ")")
    .append("text")
      .attr("text-anchor","middle")
      .attr("class", "obesity")
      .attr("transform","rotate(-90)")
      .attr("x", svgHeight/3)
      .attr("y", -(svgWidth/20 + (margin.left/4)))
      .style("font-weight", 'bold')
      .style("fill", 'black')
      .on("click", function () {
        console.log("testing333");
        setUpdatedAxisData(xAxisParam, "obesity", svg);
      })
      .text(yLabel3);

  svg
    .append("g")
      .attr("transform", "translate(" + chartWidth + ", 0)")
    .append("text")
      .attr("text-anchor","middle")
      .attr("class", "poverty")
      .attr("x", -svgWidth/3)
      .attr("y", chartHeight+margin.top-(margin.bottom/5))
      .style("font-weight", 'bold')
      .style("fill", 'black')
      .on("click", function () {
        console.log("testing444");
        setUpdatedAxisData("poverty", yAxisParam, svg);
      })
      .text(xLabel1);

  svg
    .append("g")
      .attr("transform", "translate(" + chartWidth + ", 0)")
    .append("text")
      .attr("text-anchor","middle")
      .attr("class", "age")
      .attr("x", -svgWidth/3)
      .attr("y", chartHeight+margin.top)
      .style("font-weight", 'bold')
      .style("fill", 'black')
      .on("click", function () {
        console.log("testing555");
        setUpdatedAxisData("age", yAxisParam, svg);
      })
      .text(xLabel2);

  svg
    .append("g")
      .attr("transform", "translate(" + chartWidth + ", 0)")
    .append("text")
      .attr("text-anchor","middle")
      .attr("class", "income")
      .attr("x", -svgWidth/3)
      .attr("y", chartHeight+margin.top+(margin.bottom/5))
      .style("font-weight", 'bold')
      .style("fill", 'blue')
      .on("click", function () {
        console.log("testing666");
        setUpdatedAxisData("income", yAxisParam, svg);
      })
      .text(xLabel3);



  
      
});

};

function setUpdatedAxisData(xAxisParam, yAxisParam, svg){
  
  
    console.log("X Axis: ", xAxisParam);
    console.log("Y Axis: ", yAxisParam);

    
    // Define SVG area dimensions
  var svgWidth = 800;
  var svgHeight = 600;
  
  // // Define the chart's margins as an object
  var margin = {
    top: 60,
    right: 60,
    bottom: 100,
    left: 160
  };
  
  // Define dimensions of the chart area
  var chartWidth = svgWidth - margin.left - margin.right;
  var chartHeight = svgHeight - margin.top - margin.bottom;
  
  
  factorY = 1;
  yLabel1 = "Lacks Healthcare (%)";
  yLabel2 = "Smokes (%)";
  yLabel3 = "Obese (%)";
  xLabel1 = "In Poverty (%)";
  xLabel2 = "Age (Median)";
  xLabel3 = "Household Income (Median)";
  
  if(xAxisParam == "age"){
    factorX = 1;
  };
  if(xAxisParam == "poverty"){
    factorX = 1;
  };
  if(xAxisParam == "income"){
    factorX = 1000;
  };
  
  // Load data from forcepoints.csv
  d3.csv("../static/data.csv", function(error, csvData) {
  
    minX1 = d3.min(csvData, function(data) {
      data[xAxisParam] = parseFloat(data[xAxisParam]);
      return data[xAxisParam];
    }) - (1*factorX) ;
    minY1 = d3.min(csvData, function(data) {
      data[yAxisParam] = parseFloat(data[yAxisParam]);
      return data[yAxisParam];
    }) - (0.5*factorY);
    maxX1 = d3.max(csvData, function(data) {
      data[xAxisParam] = parseFloat(data[xAxisParam]);
      return data[xAxisParam];
    }) + (1.5*factorX);
    maxY1 = d3.max(csvData, function(data) {
      data[yAxisParam] = parseFloat(data[yAxisParam]);
      return data[yAxisParam];
    }) + (1*factorY) ;
    console.log("first:"+"minX:"+minX1+";maxX:"+maxX1+"minY:"+minY1+";maxY:"+maxY1);
    console.log("Testing3");
    
    // Throw an error if one occurs
    if (error) throw error;
  
    // Print the csvData
    console.log(csvData);
  
    d3.selectAll("circle").remove();

    // Format the date and cast the force value to a number
    csvData.forEach(function(data) {
      
      var node = d3.select("svg").append('g');
      var xLoc = (chartWidth) - (chartWidth * (((((maxX1-minX1)) - (data[xAxisParam]-minX1) ))/(maxX1-minX1))) + margin.left;
      var yLoc = (chartHeight) - (chartHeight * 1/(maxY1-minY1) * (data[yAxisParam] - minY1)  ) + margin.top
  
     
      node
        .append("circle")
          .attr("class", "circle")
          .attr("cx", xLoc)
          .attr("cy", yLoc)
          .attr("r", 12)
          .style("fill", "lightblue" )
        .append("title")
          .attr("text-anchor","middle")
          .text(data['state']+"\n"+'------------------'+"\n"+xAxisParam+": "+data[xAxisParam]+"\n"+yAxisParam+": "+data[yAxisParam])
      
      node
        .append("text")
          .attr("text-anchor", "middle")
          .style("fill","white")
          .attr("x", xLoc)
          .attr("y", yLoc+5)
          .text(data.abbr)
    
  
    });
  
    // Configure a linear scale with a range between 0 and the chartWidth
    var xLinearScale = d3.scaleLinear().range([0, chartWidth]);
    
  
    // Configure a linear scale with a range between the chartHeight and 0
    var yLinearScale = d3.scaleLinear().range([chartHeight, 0]);
  
    // Set the domain for the xLinearScale function
    xLinearScale.domain([ minX1, maxX1]);
    
    // Set the domain for the xLinearScale function
    yLinearScale.domain([ minY1, maxY1 ]);
  
    // Create two new functions passing the scales in as arguments
    // These will be used to create the chart's axes
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);
  
  
    // Update y-axis
    svg.selectAll("g .y-axis")
      .call(leftAxis);

    // Update x-axis
    svg.selectAll("g .x-axis")
      .call(bottomAxis);
  
  
  svg
  .append("g")
    .attr("transform", "translate(0, " + chartHeight + ")")
  .append("text")
    .attr("text-anchor","middle")
    .attr("class", "healthcare")
    .attr("transform","rotate(-90)")
    .attr("x", svgHeight/3)
    .attr("y", -svgWidth/20)
    .style("font-weight", 'bold')
    .on("click", function () {
      console.log("testing111");
      setUpdatedAxisData(xAxisParam, "healthcare", svg);
    })
    .text(yLabel1);
    

svg
  .append("g")
    .attr("transform", "translate(0, " + chartHeight + ")")
  .append("text")
    .attr("text-anchor","middle")
    .attr("class", "smokes")
    .attr("transform","rotate(-90)")
    .attr("x", svgHeight/3)
    .attr("y", -(svgWidth/20 + (margin.left/8)))
    .style("font-weight", 'bold')
    .on("click", function () {
      console.log("testing222");
      setUpdatedAxisData(xAxisParam, "smokes", svg);
    })
    .text(yLabel2);

svg
  .append("g")
    .attr("transform", "translate(0, " + chartHeight + ")")
  .append("text")
    .attr("text-anchor","middle")
    .attr("class", "obesity")
    .attr("transform","rotate(-90)")
    .attr("x", svgHeight/3)
    .attr("y", -(svgWidth/20 + (margin.left/4)))
    .style("font-weight", 'bold')
    .on("click", function () {
      console.log("testing333");
      setUpdatedAxisData(xAxisParam, "obesity", svg);
    })
    .text(yLabel3);

svg
  .append("g")
    .attr("transform", "translate(" + chartWidth + ", 0)")
  .append("text")
    .attr("text-anchor","middle")
    .attr("class", "poverty")
    .attr("x", -svgWidth/3)
    .attr("y", chartHeight+margin.top-(margin.bottom/5))
    .style("font-weight", 'bold')
    .on("click", function () {
      console.log("testing444");
      setUpdatedAxisData("poverty", yAxisParam, svg);
    })
    .text(xLabel1);

svg
  .append("g")
    .attr("transform", "translate(" + chartWidth + ", 0)")
  .append("text")
    .attr("text-anchor","middle")
    .attr("class", "age")
    .attr("x", -svgWidth/3)
    .attr("y", chartHeight+margin.top)
    .style("font-weight", 'bold')
    .on("click", function () {
      console.log("testing555");
      setUpdatedAxisData("age", yAxisParam, svg);
    })
    .text(xLabel2);

svg
  .append("g")
    .attr("transform", "translate(" + chartWidth + ", 0)")
  .append("text")
    .attr("text-anchor","middle")
    .attr("class", "income")
    .attr("x", -svgWidth/3)
    .attr("y", chartHeight+margin.top+(margin.bottom/5))
    .style("font-weight", 'bold')
    .on("click", function () {
      console.log("testing666");
      setUpdatedAxisData("income", yAxisParam, svg);
    })
    .text(xLabel3);


    d3.selectAll("."+xAxisParam).style("fill", "blue");
    d3.selectAll("."+yAxisParam).style("fill", "blue");

    
        
  });
  
  };
  
setOriginalAxisData("income", "healthcare");

