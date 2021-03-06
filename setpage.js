$(document).ready(function () {
    $('#btnSelect').click(function () {
      $('.form-check-input').prop("checked", true);
    });
    $('#btnClear').click(function () {
      $('.form-check-input').prop("checked", false);
    });
    $('#btnTest').click(function () {
      let url = "https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-regioni/dpc-covid19-ita-regioni.csv"
      $.get(url, function (data) {
        let res = data.split('\n');
        let values = [];
        for (const el of res) {
            values.push(el.split(','));
        }
        console.log(values);
      });
    });      
  });

// set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 30, left: 60},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#graph")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

//Read the data
d3.csv("https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-regioni/dpc-covid19-ita-regioni.csv",

  // When reading the csv, I must format variables:
  function(datiItalia){
    datiItalia.filter(function (d, i) {
        if (d['denominazione_regione'] == 'Veneto') {
            console.log(d);
            return { date : d3.timeParse("%Y-%m-%d")(d.data), value : d.nuovi_positivi };
        }
    })
  },

  // Now I can use this dataset:
  function(dati) {

    // Add X axis --> it is a date format
    var x = d3.scaleTime()
      .domain(d3.extent(dati, function(d) { return d.date; }))
      .range([ 0, width ]);
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    // Add Y axis
    var y = d3.scaleLinear()
      .domain([0, d3.max(dati, function(d) { return +d.value; })])
      .range([ height, 0 ]);
    svg.append("g")
      .call(d3.axisLeft(y));

    // Add the line
    svg.append("path")
      .datum(dati)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("d", d3.line()
        .x(function(d) { return x(d.date) })
        .y(function(d) { return y(d.value) })
        )

})