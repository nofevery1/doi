var doi = window.location.search;

console.log("heyyyy " + doi);

var rep = doi.replace("?","");

var storeId;
var idFind = function (doi) {
  $.ajax({
    url: "http://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?retmode=json&db=pmc&term="+doi+"[doi]",
    datatype: "json",
    success: function(data) {
      console.log(data.esearchresult.idlist[0]);
    }
  });
}

$.when(idFind(doi)).then( function (data) {
  var pmc = data.esearchresult.idlist[0];
  console.log('part deux'+ ' ' + pmc);
  $.ajax({
    url: "http://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?retmode=xml&db=pmc&id="+pmc,
    datatype: "xml",
    success: function(data) {
      console.log(data);
    }
  });
});
