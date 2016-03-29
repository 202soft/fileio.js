#!/usr/bin/env node
// bin/jsiojs

var jsiojs = require('../lib/jsiojs_core')
var colors = require("colors")
var program = require('commander');

var args = process.argv
var params = args.slice(3)
//var command = args[2]


program
  .version("42.0.0")
  .option("create [filename]", "Create a new js file")
  .parse(process.argv)
  
try {  
  if(program.create){
      var filename = program.create
      jsiojs.createFile(filename).then(function(){
        success('File '+filename+' created with success !')
      })  
  }  
} catch(err){
  console.error(err .red);
}
/*
try {
  switch(command){
    case "create":
      var fileName = params[0]
      jsiojs.createFile(fileName).then(function(){
        success('File '+fileName+' created with success !')
      })
      break
    case "delete":
      var fileName = params[0]
      jsiojs.deleteFile(fileName).then(function(){
        success('File '+fileName+' deleted with success !')
      })
      break      
    case "rename":
      var oldName = params[0]
      var newName = params[1]
      jsiojs.renameFile(params[0], params[1]).then(function(){
        success('File '+oldName+' moved to '+newName+' with success !')
      })
      break      
    case "copy":
      var source = params[0]
      var destination = params[1]
      jsiojs.copyFile(source, destination).then(function(){
        success('File '+source+' copied to '+destination+' with success !')
      })
      break      
    case "show":
      jsiojs.showFile(params[0]).then(function(content){
        console.log(content)
      })
      break 
    default:
      console.error("Invalid command" .red)
      break
  }
} catch(err){
  console.error(err .red);
}
*/

function success(message){
  console.info(message .green)
}