var http = require("http");
var readReq = require("./readRequest");
var ini = require("./text");
var funcValue = []
var funcType = [];
var ffi = require("node-ffi");
var returnType = "";
var funcName ="";
var num = 1

ini.DynLib();
//var lib1 = ffi.Library("./lib1", {"ad": [ "int", [ "int", "int" ]] });
http.createServer(function(req, response) {
  response.writeHead(200, {"Content-Type": "text/plain"});
  req.setEncoding('utf-8');
  if (req.url[1] == ">") {
    funcValue = readReq.Search(req.url, "value");
    funcType = readReq.Search(req.url, "type");
    returnType = readReq.GetReturnType(req.url);
    funcName = funcValue[0];
    funcValue.shift();
    console.log("SENDED!");
  switch (funcName){
     case "add": 
        var rez = lib1.add(parseInt(funcValue[0]), parseInt(funcValue[1])) + "";
        break;
     case "multiplication":
        var rez = lib1.multiplication(parseInt(funcValue[0]), parseInt(funcValue[1])) + "";
        break; 
     case "subtraction":
        var rez = lib1.subtraction(parseInt(funcValue[0]), parseInt(funcValue[1])) + "";
        break; 
}
//    var rez = lib1.funcName(parseInt(funcValue[0]), parseInt(funcValue[1])) + "";
    
    response.write(rez);
   console.log("rezult= " , rez);
  }

  response.end();
}).listen(8888);
console.log("Server has started!");
b = "f1";








