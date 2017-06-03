function f(){  
    var query = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.historicaldata%20where%20symbol%3D%22" + "GOOG" + "%22%20and%20startDate%20%3D%20%22" + "2009-09-11" + "%22%20and%20endDate%20%3D%20%22" + "2009-09-15" + "%22&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=";

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            makeAndShowChart(JSON.parse(this.responseText).query.results.quote);
        }
    };
    xhttp.open("GET", query, true);
    xhttp.send();  
}


function makeAndShowChart(dataArray){
    console.log("begin");
    var hi = [] ;
    var lo = [];
    var avg = [];
    var open = [];
    var close =[];
    var dates = [];

    // make arrays from JSON data
    for (var i=0; i<dataArray.length; i++){
        hi[i] = dataArray[i].High;
        lo[i] = dataArray[i].Low;
        avg[i] = (parseFloat(hi[i]) + parseFloat(lo[i]))/2.0;
        open[i] = dataArray[i].Open;
        close[i] = dataArray[i].Close;
        dates[i] = dataArray[i].Date;
    } 
    
    console.log(avg);
    console.log(Math.abs(open[2]-close[2]));

    //  the size of the overall svg element
    var height = document.getElementById("chart").clientHeight,
        width = document.getElementById("chart").clientWidth,
        
        marginLeft = 50,
        marginRight = 50,
        marginTop = 30,
        marginBottom = 40,
        chartHeight = height-marginTop - marginBottom,
        chartWidth = width-marginLeft - marginRight;
        widthPerDataPoint = chartWidth / dataArray.length,
        widthOfDataBar = .10 * widthPerDataPoint;
        hwob = widthOfDataBar/2;
    console.log(width, height);
    //x Axis
    var lablePositions =[]; //Set up ordinal groupd for this axis
    for (var i=0; i<dates.length; i++){
        lablePositions.push(i*widthPerDataPoint + widthOfDataBar/2);
    }
    var xScale = d3.scaleOrdinal() //Set scale for axis
        .domain(dates)
        .range(lablePositions);
    var xAxis = d3.axisBottom() //Create axis object
        .scale(xScale);
    
    //y Axis
    var yScale = d3.scaleLinear()
        .domain([Math.min(d3.min(hi),d3.min(lo)), Math.max(d3.max(hi),d3.max(lo))])
        .range([0, chartHeight]);

    //style functions
    var gainOrLoss = function(i){
        if(open[i]<close[i]){
            return "green";
        } else if (open[i]>close[i]) {
            return "red";
        } else {
            return "black";
        }
    }
    
    //chartBox
    var chartBox = d3.select('#chart')
        .append('svg')
          .attr('width', width)
          .attr('height', height)

    //chartArea
    var chartArea = chartBox.append('g')
        .attr('width', chartWidth )
        .attr('height', chartHeight)
        .attr('transform', 'translate(' + marginLeft + ',' + marginTop + ')' );
    
    //vertical line
    chartArea.append('g')
        .selectAll("line").data(dates).enter()
            .append('line')
                .attr("x1", function (d, i) { return xScale(i); })
                .attr("y1", function(d,i){return chartHeight - yScale(hi[i]); })
                .attr("x2", function (d, i) { return xScale(i); })
                .attr("y2", function(d,i){return chartHeight - yScale(lo[i]); })
                .style("stroke", "black")
                .style("stroke-width", 1)
                .style("stroke-dasharray", "none");
            
    //Hi
    chartArea.append('g')
        .selectAll("line").data(dates).enter()
            .append('line')
                .attr("x1", function (d, i) { return xScale(i)-hwob; })
                .attr("y1", function(d,i){return chartHeight - yScale(hi[i]); })
                .attr("x2", function (d, i) { return xScale(i)+hwob; })
                .attr("y2", function(d,i){return chartHeight - yScale(hi[i]); })
                .style("stroke", "green")
                .style("stroke-width", 1)
                .style("stroke-dasharray", "none")
     
    //Lo
    chartArea.append('g')
        .selectAll("line").data(dates).enter()    
            .append('line')
            .attr("x1", function (d, i) { return xScale(i)-hwob; })
            .attr("y1", function(d,i){return chartHeight - yScale(lo[i]); })
            .attr("x2", function (d, i) { return xScale(i)+hwob; })
            .attr("y2", function(d,i){return chartHeight - yScale(lo[i]); })
            .style("stroke", "red")
            .style("stroke-width", 1)
            .style("stroke-dasharray", "none");

    //Avg
    chartArea.append('g')
        .selectAll("line").data(dates).enter()    
            .append('line')
            .attr("x1", function (d, i) { return xScale(i)-hwob; })
            .attr("y1", function(d,i){return chartHeight - yScale(avg[i]); })
            .attr("x2", function (d, i) { return xScale(i)+hwob; })
            .attr("y2", function(d,i){return chartHeight - yScale(avg[i]); })
            .style("stroke", "black")
            .style("stroke-width", 1)
            .style("stroke-dasharray", "none");

    //open close bar
    chartArea.append('g')
        .selectAll("rect").data(dates).enter()      
            .append('rect')
              .attr('height', function(d,i){ return Math.abs(yScale(open[i])-yScale(close[i])); })
              .attr('y', function (d,i) { return chartHeight - Math.max(yScale(open[i]), yScale(close[i])) ; }) //
              .attr('width', widthOfDataBar )
              .attr('x', function (d, i) { return xScale(i)-hwob; })
              .style('fill', function(d,i){ return gainOrLoss(i); });

    chartArea.selectAll('text').data(chartdata).enter()
        .append('text')
        .text(function(d){ return d; })
        .attr("y", function(d){ return chartHeight - yScale(d)-10; })
        .attr("x", function(d,i){ return xScale(i) + (widthOfDataBar)/2; })
        .style("font-family", "sans-serif")
        .style("font-size", "11px")
        .style("fill", "white")
        .style("text-anchor", "middle");
    
    // chartArea.selectAll('image').data(chartdata).enter()
    //     .append('image')
    //       .attr("xlink:href", function(d,i){ return "../img/" + dataLabels[i] +".gif"; })
    //       .attr("width",widthOfDataBar-10 + "px")
    //       .attr("height",widthOfDataBar-10 + "px")
    //       .attr("y", function(d){ return chartHeight - yScale(d); })
    //       .attr("x", function(d,i){ return xScale(i)+5; });
    

    
    // chartArea.append("g") //Put axis in its own group for positioning
    //     .attr("transform", "translate(0," + chartHeight +")")
    //     .attr("class", "axisStyle")
    //     .call(d3.axisBottom(xScale));
    
    // chartArea.append("g")
    //     .append("line")
    //       .attr("x1",0)
    //       .attr("y1",chartHeight)
    //       .attr("x2",chartWidth)
    //       .attr("y2",chartHeight)
    //       .style("stroke","white");
    
    //y Axis
    //  var yScale = d3.scaleLinear() //Set scale for axis
    //     .domain([0, d3.max(chartdata)])
    //     .range([chartHeight,0]);
    
    // var yAxis = d3.axisLeft() //Create axis object
    //     .scale(yAxisScale);
    
    // chartArea.append("g") //Put axis in its own group for positioning
    //     .attr("class", "axisStyle")
    //     .call(d3.axisLeft(yAxis));
    
    
    //Axis Lables
    // chartArea.append("text")
    //     .attr("transform", "translate(" + (chartWidth / 2) + " ," + (chartHeight + .20*chartHeight) + ")")
    //     .style("font-family", "sans-serif")
    //     .style("font-size", "8px")
    //     .style("fill", "white")
    //     .style("text-anchor", "middle")
    //     .text("Teams");
    
    // chartArea.append("text")
    //     .attr("transform", "rotate(-90)")
    //     .attr("y", 0 - .05*chartWidth)
    //     .attr("x",0 - (chartHeight / 2))
    //     .style("font-family", "sans-serif")
    //     .style("font-size", "8px")
    //     .style("fill", "white")
    //     .style("text-anchor", "middle")
    //     .text("Num of Season Tickets Sold to Women Named 'Lee'");
    
    //Display Text
    // var displayTextArea = barChart8.append('g')
    //     .attr('width', chartWidth )
    //     .attr('height', "2em")
    //     .attr("y",0)
    //     .attr("x",0);
    
    // displayTextArea.append('text')
    //     .attr("id", "displayText")
    //     // .attr('transform', 'translate('+ .50*chartWidth + ',' + .15*chartHeight + ')' )
    //     .attr("y", .20*chartHeight)
    //     .attr("x", .60*chartWidth)
    //     .style("font-family", "sans-serif")
    //     .style("font-size", "24px")
    //     .style("fill", "white")
    //     .style("text-anchor", "middle");

            
}
 
