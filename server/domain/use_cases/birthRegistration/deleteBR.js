var fs = require('fs');
var file = require('./../../../database/birthRegistration_Data.json');

function deleteBR(res, element){
  
 file.map(
  (fileElement, index)=>{
    if(fileElement.id === element){
      console.log("FOND IT CHEIF INDEX OF IT",index)
      file.splice(index,1)
    } 
  }
 )  

  console.log('file',file)
   fs.writeFile(__dirname+'./../../../database/birthRegistration_Data.json', JSON.stringify(file), function (err) {
   
     console.log(err);
   });
  res.send(`element ${element} got deleted`);
    }

module.exports = deleteBR;