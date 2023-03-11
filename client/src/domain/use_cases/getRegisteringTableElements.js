import {useState, useEffect  } from "react";
import backend from '../../data/data_source/api/entity/axiosAPI'


export default function RegisteringTableElements(){
    const [joke, setjoke] = useState([
       {
           "id":  "جار تحميل البيانات ...",
           "date": "جار تحميل البيانات ...",
           "name": " جار تحميل البيانات ...",
       },
   ])
     useEffect(
       ()=>{
           async function fetchData(){
              const request = await backend.get('/registering')
              console.log('I GOT IT',request)
              setjoke(request.data)
              return request
           }
           fetchData();
       },[]);
   
       return (
           <div>
           {   joke.map(
                   (users, index) => (    
                    <h1 key={index}>{users.name}</h1>
                   ))
               }
           </div>
       )
      
   }