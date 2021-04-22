$(document).ready(function () {
    $('#btnSelect').click(function () {
      $('.form-check-input').prop("checked", true);
    });
    $('#btnClear').click(function () {
      $('.form-check-input').prop("checked", false);
    });
    $('#btnTest').click(function () {
      let url = "https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-regioni/dpc-covid19-ita-regioni-latest.csv"
      $.get(url, function (data) {
        console.log(data);
      });
    });      
  });