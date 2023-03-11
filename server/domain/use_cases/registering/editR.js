var fs = require('fs');
var file = require('./../../../database/registering_Data.json');


function EditR(res, id, element){

    file.map(
        (fileElement, index)=>{
          if(fileElement.id === id){
                  console.log('fond it',file[index])
                  file[index] = element
          } 
        }
       )  
//console.log('file',file)
 fs.writeFile(__dirname+'./../../../database/registering_Data.json', JSON.stringify(file), function (err) {
   console.log(err);
 });
  res.send(element);
    }

module.exports = EditR;



