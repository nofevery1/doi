var doi = window.location.search;

console.log("heyyyy " + doi);

var rep = doi.replace("?","");
var idFind = function (doi) {
  $.ajax({
    url: "http://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?retmode=json&db=pmc&term="+doi+"[doi]",
    datatype: "json",
    success: function(data) {
      var pmc = data.esearchresult.idlist[0];
      console.log(pmc);
      $.ajax({
        url: "http://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?retmode=xml&db=pmc&id="+pmc,
        datatype: "xml",
        success: function(data) {
          conversion(data);
        }
      });
    }
  });
}

var conversion = function(data) {
  console.log(data);
  var newDiv = $("<div>", {
    id: "fromDoi",
    class: "paper"
  });
  newDiv.css({"width": "100%","height":"100%","background-color":"white"});
  var xml = data;
  //console.log(xml);
  var xmlDoc = $.parseXML( xml );
  var test = $(xmlDoc)
  //console.log(test);
  newDiv.html(test);
  //console.log(newDiv);
  newDiv.appendTo("body");
}

idFind(doi);
