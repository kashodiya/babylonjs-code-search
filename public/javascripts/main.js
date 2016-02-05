
//TODO: Put this in the $ function
var searchResponse;


$(function(){
  console.log("OK");
  
  var searchResultsTemplate, editor, versionsTemplate;
  
  init();
  
  function registerSearch() {
    $("#searchForm").submit(function (e) {
      e.preventDefault();
      console.log("Searching...");
      $.getJSON("/api/search?searchTerm=" + $('#searchTerm').val(), function(data){
        console.log("Search done. Found", data.snippets.length);
        searchResponse = data;
        //console.log(data);
        var html = searchResultsTemplate(data);
        //console.log(html);
        $('#snippetList').empty().append(html);
        $('#searchResultContainer').removeClass('hide');
        $('#searchResultContainer').show();
        
        showCode(searchResponse.snippets[0].SnippetIdentifier);
        
      });
      
    });
  }
  
  function registerView() {
    $('body').on("click", ".snippetCodeView", function(e){
      e.preventDefault();
      e.stopPropagation();
      var snippetId = $(this).data('identifier');
      var fromLink = $(this).data('from');
      var showVersionList = fromLink !== "version-links";
      
      showCode(snippetId, showVersionList);
    });
  }
  
  function showVersions(justId) {
    var snippets = _.filter(searchResponse.snippets, function(s){
      return (s.Id === justId);
    });
    
    //console.log("All versions", snippets);
    
    if(snippets.length > 1){
      
      var html = versionsTemplate({snippets: snippets});
      $('#allVersionsList').empty().append(html);
      
      
      $('#allVersionsList').show();
    }else{
      $('#allVersionsList').hide();
    }

  }
  
  function showCode(snippetId, showVersionList) {
      console.log("Showing code:", snippetId);
      
      var snippet = _.find(searchResponse.snippets, {SnippetIdentifier: snippetId});
      var justId = snippet.Id;
      if(showVersionList) showVersions(justId);
      $('#snippetTitle').html(snippetId);
      var code = JSON.parse(snippet.JsonPayload).code;
      setEditorText(code);
  }
  
  function registerPlay() {
    $('#snippetList').on("click", ".snippetRun", function(e){
      e.preventDefault();
      e.stopPropagation();
      var snippetId = "#" + $(this).data('identifier').replace("-", "#");
      var url = "http://www.babylonjs-playground.com/" + snippetId;
      console.log("Opening:", snippetId);
      window.open(url, '_blank');
    });
  }

  function init() {
    editor = ace.edit("editor");
    editor.setTheme("ace/theme/twilight");
    var JavaScriptMode = ace.require("ace/mode/javascript").Mode;
    editor.session.setMode(new JavaScriptMode());    
    editor.$blockScrolling = Infinity;
    
    var source = $("#search-results-template").html();
    searchResultsTemplate = Handlebars.compile(source);
    
    source = $("#versions-template").html();
    versionsTemplate = Handlebars.compile(source);
    
    $('#allVersionsList').hide();

    
    registerSearch();    
    registerView();
    registerPlay();
  }
  
  function setEditorText(text) {
    editor.setValue(text, -1);
  }  

});

function test(){
  //JSON.parse(searchResponse.snippets[0].JsonPayload).code
}

/*
Interesting libraries

https://www.npmjs.com/package/recast
http://astexplorer.net/
https://www.npmjs.com/package/esrefactor
https://github.com/estools/escope
http://mazurov.github.io/escope-demo/
https://www.npmjs.com/package/coveraje
https://www.npmjs.com/package/decomment


*/