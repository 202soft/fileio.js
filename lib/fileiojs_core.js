"use strict";

var FS = require("q-io/fs");
var Q = require("q");

module.exports.manager = (type, ext, msg) => new FileIoManager(type, ext, msg);

class FileIoManager {
  
  constructor(type, ext, msg){
    this.type = type;
    this.ext = ext;
    this.msg = msg;
  }
  
  createFile(filename) {
    return Q()
      .then(() => checkFileExt(filename, this.type, this.ext))
      .then(() => checkFileNotExist(filename))
      .then(() => FS.write(filename, this.msg));
  }
  
  deleteFile(filename) {
    return Q()
      .then(() => checkFileExt(filename, this.type, this.ext))
      .then(() => checkFileExist(filename))
      .then(() => FS.remove(filename))
  }
  
  deleteFile(filename) {
    return Q()
      .then(() => checkFileExt(filename, this.type, this.ext))
      .then(() => checkFileExist(filename))
      .then(() => FS.remove(filename));
  }
  
  renameFile(oldname, newname) {
    return Q()
      .then(() => checkFileExt(oldname, this.type, this.ext))
      .then(() => checkFileExt(newname, this.type, this.ext))
      .then(() => checkFileExist(oldname))
      .then(() => checkFileNotExist(newname))
      .then(() => FS.rename(oldname, newname));
  }

  copyFile(source, destination) {
    return Q()
      .then(() => checkFileExt(source, this.type, this.ext))
      .then(() => checkFileExt(destination, this.type, this.ext))
      .then(() => checkFileExist(source))
      .then(() => checkFileNotExist(destination))
      .then(() => FS.copy(source, destination));
  }
  
  showFile(filename) {
    return Q()
      .then(() => checkFileExt(filename, this.type, this.ext))
      .then(() => checkFileExist(filename))
      .then(() => FS.read(filename, "r"));
  }
  
}
  
function checkFileExt(filename, type, ext){
  let deferred = Q.defer();
  let l = ext.length;
  if(filename === undefined) {
    deferred.reject("filename is missing");
  } else if(filename.length < l+2 || !filename.endsWith(`.${ext}`)){
    deferred.reject(`'${filename}' is not a valid ${type} filename`);
  } else {
    deferred.resolve();
  }
  return deferred.promise;
}

function checkFileExist(filename){
  let deferred = Q.defer();
  FS.exists(filename).then((result) => {
    if(result){
      deferred.resolve();
    } else {
      deferred.reject(`'${filename}' does not exist`);
    }
  });
  return deferred.promise;  
}

function checkFileNotExist(filename){
  let deferred = Q.defer();
  FS.exists(filename).then((result) => {
    if(result){
      deferred.reject(`'${filename}' already exists`);
    } else {
      deferred.resolve();
    }
  });
  return deferred.promise;
}