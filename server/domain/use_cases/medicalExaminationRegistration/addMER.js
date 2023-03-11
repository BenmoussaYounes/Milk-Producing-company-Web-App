var fs = require('fs');
var file = require('./../../../database/medicalExaminationRegistration_Data.json');



function addMER(res, element){
  console.log('i got this',element)
   console.log('leng',file.length)
  file[file.length] = element;
  console.log('file',file)

   fs.writeFile(__dirname+'./../../../database/medicalExaminationRegistration_Data.json', JSON.stringify(file), function (err) {
     console.log(err);
   });
  res.send(element);
    }

module.exports = addMER;
