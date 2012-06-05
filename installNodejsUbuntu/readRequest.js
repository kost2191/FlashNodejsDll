var a = [];
//a = Search(">?+return=fName+int=123+float=987.5", "type"); //test
function GetReturnType(text){
  curPos = 0;  //start of info
  endPos = 0;  //end of info  
  curPos = text.indexOf("?", curPos) + 1;
  endPos = text.indexOf("=", curPos);
  return text.slice(curPos, endPos);
}
 exports.GetReturnType = GetReturnType;

function Search(text, way){  //text - request, from = to + if values, + to = if types
  curPos = 0;  //start of info
  endPos = 0;  //end of info
  rez = [];
  if (way == "type") {
    from = "+";
    to = "=";
  }
  if (way == "value") {
     from = "=";
     to = "+";
  }
  while (text.indexOf(from, curPos) != -1) {
    curPos = text.indexOf(from, curPos) + 1;
    endPos = text.indexOf(to, curPos);
    if (endPos == -1) { endPos = text.length}
    rez.push(text.slice(curPos, endPos));
  }
  return rez;
}
exports.Search = Search; //externs the func to other files
