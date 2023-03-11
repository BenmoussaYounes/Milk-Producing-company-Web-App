var fs = require('fs');
var file = require('./../../../database/totalDailyMilkP_Data.json');


function editTDMP(res, date, element){

    file.map(
        (fileElement, index)=>{
          if(fileElement.date === date){
                  console.log('fond it',file[index])
                  file[index] = element
          } 
        }
       )  
//console.log('file',file)
 fs.writeFile(__dirname+'./../../../database/totalDailyMilkP_Data.json', JSON.stringify(file), function (err) {
   console.log(err);
 });
  res.send(element);
    }

module.exports = editTDMP;
