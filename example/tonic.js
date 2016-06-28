// Sample for tonic : https://tonicdev.com/npm/fileiojs
var fileiojs = require("fileiojs");
var manager = fileiojs.manager("Text", "txt", "// Very impressive file")
// Start of my wonderfull project
manager.createFile("wonderful.txt")
      .then(function(){
        // Oh my god, the file contains a typo. I should fix !
        return manager.renameFile("wonderful.txt", "wonderfull.txt"); 
      }).then(function(){
         console.log("Ready for a wonderfull project !"); 
      });
