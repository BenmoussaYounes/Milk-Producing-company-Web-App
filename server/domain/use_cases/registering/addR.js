
var fs = require('fs');
var file = require('./../../../database/registering_Data.json');
function addR(res, element){
  console.log('i got this',element)
  //console.log(file.length)
  /** 
    element =  {
    "id": 99,
    "date": "younes",
    "name": "الهولشتاين"
}
  */
   console.log('leng',file.length)
  file[file.length] = element;
  console.log('file',file)

   fs.writeFile(__dirname+'./../../../database/registering_Data.json', JSON.stringify(file), function (err) {
     console.log(err);
   });
  res.send(element);
    }

module.exports = addR;



