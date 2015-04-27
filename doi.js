var doi = window.location.search;

console.log("heyyyy " + doi);

var rep = doi.replace("?","");
$.ajax({
      url: "http://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?retmode=json&db=pmc&term="+doi+"[doi]",
      datatype: "json",
      success: function(data) {
        console.log(data);

      }
});
