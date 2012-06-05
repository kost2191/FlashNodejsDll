var ffi = require("node-ffi");
var fs = require("fs");
function DynLib(){
var request = [];
fs.readFile('base.txt', 'UTF-8', function (err, text) {
  if (err) throw err;
  curPos = 0;
  endPos = 0;
  while (text.indexOf("\n", curPos) != -1) {
    endPos = text.indexOf("\n", curPos);
    if (endPos == -1) 
        { endPos = text.length}
    request.push(text.slice(curPos, endPos));
    curPos = endPos + 1;
  }   
//  console.log("req: ", request);
StructForLib = new Object();

  for(i=0; i < request.length -1; i++) {
    curPos = 0;
    endPos = 0;
    returnType = "";
    funcName = "";
    funcType = [];
    endPos = request[i].indexOf(",", curPos);
    funcName = request[i].slice(curPos, endPos) +"";
    curPos = endPos + 1;
    endPos = request[i].indexOf(",", curPos);
    returnType = request[i].slice(curPos, endPos);
    curPos = endPos + 1;     
    while (request[i].indexOf(",", curPos) != -1) {
      endPos = request[i].indexOf(",", curPos);
      funcType.push(request[i].slice(curPos, endPos));
      curPos = endPos + 1;
    }
    StructForLib[funcName] = [returnType, funcType];
  }

libName ="./" +  request[request.length - 1];
lib1 = ffi.Library(libName, StructForLib);
console.log("StructForLib = "); console.log(StructForLib);
});

}
exports.DynLib = DynLib; //externs the func to other files
