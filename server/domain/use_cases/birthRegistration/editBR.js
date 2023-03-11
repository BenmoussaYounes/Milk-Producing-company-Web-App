var fs = require('fs');
var file = require('./../../../database/birthRegistration_Data.json');


function editBR(res, id, element){

    file.map(
        (fileElement, index)=>{
          if(fileElement.id === id){
                  console.log('fond it',file[index])
                  file[index] = element
          } 
        }
       )  
//console.log('file',file)
 fs.writeFile(__dirname+'./../../../database/birthRegistration_Data.json', JSON.stringify(file), function (err) {
   console.log(err);
 });
  res.send(element);
    }

module.exports = editBR;

