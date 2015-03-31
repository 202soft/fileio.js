#!/usr/bin/env node
// bin/jsiojs

var jsiojs = require('../lib/jsiojs_core')
 
var args = process.argv

var command = args[2]
var params = args.slice(3)

try {
  switch(command){
    case "create":
      jsiojs.createFile(params[0])
      break
    case "delete":
      jsiojs.deleteFile(params[0])
      break      
    case "rename":
      jsiojs.renameFile(params[0], params[1])
      break      
    case "copy":
      jsiojs.copyFile(params[0], params[1])
      break      
    default:
      console.error("Invalid command")
      break
  }
} catch(err){
  console.error(err);
}