var doi = window.location.search;

console.log("heyyyy " + doi);

var rep = doi.replace("?","");
$.ajax({
      url: "http://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pmc&retmode=json&term="+doi,
      datatype: "json",
      success: function(data) {
        console.loge(data);
      }
});
