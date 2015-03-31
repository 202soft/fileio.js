var chai = require('chai')
var jsiojs = require('../lib/jsiojs_core')
var fs = require("fs")

chai.should()
var expect = chai.expect

// Prepare for test
var tmpDir = "tmp-"+Math.random()+"/"
fs.mkdirSync(tmpDir)

describe('jsiojs', function() {
    describe('#createFile', function() {
        it('Should create a javascript file', function() {
            // Given
            var fileName = generateFileName()
            fs.existsSync(fileName).should.be.false
            // When
            jsiojs.createFile(fileName)
            // Then
            fs.existsSync(fileName).should.be.true
        })
    })
    
    
    describe('#createFile', function() {   
        it('Should fail when no fileName', function() {
            // When
            var fn = function(){ jsiojs.createFile() }
            // Then
            expect(fn).to.throw("file name is missing")
        })
    })
    
    describe('#createFile', function() {   
        it('Should fail when not a javascript file', function() {
            // Given
            var fileName = generateFileName()+".txt"
            // When
            var fn = function(){ jsiojs.createFile(fileName) }
            // Then
            expect(fn).to.throw(fileName+" is not a valid javascript file name")

        })
    })
    
    describe('#createFile', function() {   
    it('Should fail when file already exists', function() {
            // Given
            var fileName = generateFileName()
            fs.writeFileSync(fileName,"")
            fs.existsSync(fileName).should.be.true
            // When
            var fn = function(){ jsiojs.createFile(fileName) }
            // Then
            expect(fn).to.throw(fileName+" already exists")
        })
    })
})

describe('jsiojs', function() {
    describe('#deleteFile', function() {
        it('Should delete a javascript file', function() {
            // Given
            var fileName = generateFileName()
            fs.writeFileSync(fileName,"")
            fs.existsSync(fileName).should.be.true
            // When
            jsiojs.deleteFile(fileName)
            // Then
            fs.existsSync(fileName).should.be.false
        })
    })
    
    describe('#deleteFile', function() {   
        it('Should fail when no fileName', function() {
            // When
            var fn = function(){ jsiojs.deleteFile() }
            // Then
            expect(fn).to.throw("file name is missing")
        })
    })
    
    describe('#deleteFile', function() {   
        it('Should fail when not a javascript file', function() {
            // Given
            var fileName = generateFileName()+".txt"
            // When
            var fn = function(){  jsiojs.deleteFile(fileName) }
            // Then
            expect(fn).to.throw(fileName+" is not a valid javascript file name")
        })
    })
    
    describe('#deleteFile', function() {   
        it('Should fail when file does not exist', function() {
            // Given
            var fileName = generateFileName()
            fs.existsSync(fileName).should.be.false
            // When
            var fn = function(){  jsiojs.deleteFile(fileName) }
            // Then
            expect(fn).to.throw(fileName+" does not exist")
        })
    })

})


describe('jsiojs', function() {
    describe('#renameFile', function() {
        it('Should rename a javascript file', function() {
            // Given
            var oldName = generateFileName()
            fs.writeFileSync(oldName,"")
            fs.existsSync(oldName).should.be.true
            var newName = generateFileName()
            fs.existsSync(newName).should.be.false
            // When
            jsiojs.renameFile(oldName, newName)
            // Then
            fs.existsSync(oldName).should.be.false
            fs.existsSync(newName).should.be.true
        })
    })
    
    describe('#renameFile', function() {   
        it('Should fail when no fileName', function() {
            // When
            var fn = function(){ jsiojs.renameFile() }
            // Then
            expect(fn).to.throw("file name is missing")
        })
    })
    
    describe('#renameFile', function() {   
        it('Should fail when only one fileName', function() {
            // Given
            var oldName = generateFileName()
            // When
            var fn = function(){ jsiojs.renameFile(oldName) }
            // Then
            expect(fn).to.throw("file name is missing")
        })
    })
    
    describe('#renameFile', function() {   
        it('Should fail when oldName not a javascript file', function() {
            // Given
            var oldName = generateFileName()+".txt"
            var newName = generateFileName()
            // When
            var fn = function(){  jsiojs.renameFile(oldName, newName) }
            // Then
            expect(fn).to.throw(oldName+" is not a valid javascript file name")
        })
    })
    
    describe('#renameFile', function() {   
        it('Should fail when newName not a javascript file', function() {
            // Given
            var oldName = generateFileName()
            var newName = generateFileName()+".txt"
            // When
            var fn = function(){  jsiojs.renameFile(oldName, newName) }
            // Then
            expect(fn).to.throw(newName+" is not a valid javascript file name")
        })
    })    
    
    describe('#renameFile', function() {   
        it('Should fail when oldName does not exist', function() {
            // Given
            var oldName = generateFileName()
            var newName = generateFileName()
            fs.existsSync(oldName).should.be.false
            // When
            var fn = function(){  jsiojs.renameFile(oldName, newName) }
            // Then
            expect(fn).to.throw(oldName+" does not exist")
        })
    })
    
    describe('#renameFile', function() {   
        it('Should fail when newName already exists', function() {
            // Given
            var oldName = generateFileName()
            var newName = generateFileName()
            fs.writeFileSync(oldName,"")
            fs.writeFileSync(newName,"")
            fs.existsSync(newName).should.be.true
            // When
            var fn = function(){  jsiojs.renameFile(oldName, newName) }
            // Then
            expect(fn).to.throw(newName+" already exists")
        })
    })    

})

describe('jsiojs', function() {
    describe('#copyFile', function() {
        it('Should copy a javascript file', function() {
            // Given
            var src = generateFileName()
            fs.writeFileSync(src,"")
            fs.existsSync(src).should.be.true
            var dest = generateFileName()
            fs.existsSync(dest).should.be.false
            // When
            jsiojs.copyFile(src, dest)
            // Then
            fs.existsSync(src).should.be.true
            fs.existsSync(dest).should.be.true
        })
    })
    
    describe('#copyFile', function() {   
        it('Should fail when no fileName', function() {
            // When
            var fn = function(){ jsiojs.copyFile() }
            // Then
            expect(fn).to.throw("file name is missing")
        })
    })
    
    describe('#copyFile', function() {   
        it('Should fail when only one fileName', function() {
            // Given
            var src = generateFileName()
            // When
            var fn = function(){ jsiojs.copyFile(src) }
            // Then
            expect(fn).to.throw("file name is missing")
        })
    })
    
    describe('#copyFile', function() {   
        it('Should fail when source not a javascript file', function() {
            // Given
            var src = generateFileName()+".txt"
            var dest = generateFileName()
            // When
            var fn = function(){  jsiojs.copyFile(src, dest) }
            // Then
            expect(fn).to.throw(src+" is not a valid javascript file name")
        })
    })
    
    describe('#copyFile', function() {   
        it('Should fail when destination not a javascript file', function() {
            // Given
            var src = generateFileName()
            var dest = generateFileName()+".txt"
            // When
            var fn = function(){  jsiojs.copyFile(src, dest) }
            // Then
            expect(fn).to.throw(dest+" is not a valid javascript file name")
        })
    })    
    
    describe('#copyFile', function() {   
        it('Should fail when source does not exist', function() {
            // Given
            var src = generateFileName()
            var dest = generateFileName()
            fs.existsSync(src).should.be.false
            // When
            var fn = function(){  jsiojs.copyFile(src, dest) }
            // Then
            expect(fn).to.throw(src+" does not exist")
        })
    })
    
    describe('#copyFile', function() {   
        it('Should fail when destination already exists', function() {
            // Given
            var src = generateFileName()
            var dest = generateFileName()
            fs.writeFileSync(src,"")
            fs.writeFileSync(dest,"")
            fs.existsSync(dest).should.be.true
            // When
            var fn = function(){  jsiojs.renameFile(src, dest) }
            // Then
            expect(fn).to.throw(dest+" already exists")
        })
    })     

})


function generateFileName(){
    return tmpDir+Math.random()+".js"    
}