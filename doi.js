var doi = window.location.search;


if (doi.match(/[A-Za-z]/)) {
  console.log("heyyyy " + doi);

  var rep = doi.replace("?","");
  var idFind = function (doi) {
    $.ajax({
      url: "http://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?retmode=json&db=pmc&term="+rep+"[doi]",
      datatype: "json",
      success: function(data) {
        var pmc = data.esearchresult.idlist[0];
        if (pmc == undefined) {
          var $mess = $("<div>", {
            id: "reroute",
            class: "floater"
          });
          $mess.text("DOI does not have article available in PMC :( Sorry! Rerouting to DOI's source...");
          $("body").html($mess);
          //alert("DOI does not have article available in PMC :( Sorry! Rerouting to DOI's source...");
          setTimeout(function() {document.location.href = "http://dx.doi.org/"+rep;},3000);
          //document.location.href = "http://dx.doi.org/"+rep;
        }

        console.log(pmc);
        $.ajax({
          url: "http://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?retmode=xml&db=pmc&id="+pmc,
          datatype: "xml",
          success: function(data) {
            conversion(data);
          }
        });
      },
      error: function (xhr, ajaxOptions, thrownError) {
        alert(xhr.status);
        alert(thrownError);
      }
    });
  }
  function xmlToString(xmlData) {

    var xmlString;
    //IE
    if (window.ActiveXObject){
      xmlString = xmlData.xml;
    }
    // code for Mozilla, Firefox, Opera, etc.
    else{
      xmlString = (new XMLSerializer()).serializeToString(xmlData);
    }
    return xmlString;
  }

  var conversion = function(data) {
    var xml = data;
    console.log(xml);
    var $xml = $(xml);
    console.log($xml);
    var $title = $xml.find("journal-title");
    console.log($title);
    var $frem = $("<iframe>", {
      id: "paperXml",
    });

    var str = xmlToString(xml);
    $("body").html(str);
    //$frem.text(xml);
    //$("body").append($frem);
    //  newDiv.html(test);
    //console.log(newDiv);
    //$("body").append($xml.text());
    /*var newDiv = $("<div>", {
    id: "fromDoi",
    class: "paper"
  });
  newDiv.css({"width": "100%","height":"100%","background-color":"white"});
  newDiv.appendTo("body");*/
  }

idFind(doi);
}
