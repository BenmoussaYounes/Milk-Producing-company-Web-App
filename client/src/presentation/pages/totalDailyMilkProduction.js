import { useState, useEffect } from "react";
import backend from "../../data/data_source/api/entity/axiosAPI";

import { Modal, Button } from "react-bootstrap";



export default function TotalDailyMilkProduction(){
    
    const [totalydailymilkproductonData, setTotalyMPD] = useState([
        {
            "milkQuantity":  "جار تحميل البيانات ...",
            "date": "جار تحميل البيانات ...",
        },
    ])

      useEffect(
        ()=>{
            async function fetchData(){
               const request = await backend.get('/totalyDailyMilk')
               setTotalyMPD(request.data)
             //  console.log('Data -> ',request)
               return request
            }
            fetchData();
        },[totalydailymilkproductonData]);
    
      // --- Form Methods 

      const handleShow = () => setShow(true);

      const [show, setShow] = useState(false);
  
      const handleClose = () => setShow(false);
      // Save 
      const [newTDMPData, setnewTDMPData] = useState(
          {
              "milkQuantity": "",
              "date": "",
          }
      );
      function hundlSave(e) {
          const newData = { ...newTDMPData }
          newData[e.target.id] = e.target.value
          setnewTDMPData(newData)
          console.log(newData)
      }
  
      function submitAddModal() {
          backend.post('/totalyDailyMilk', {
            "milkQuantity": newTDMPData.milkQuantity,
              "date": newTDMPData.date,
          })
          console.log('DATA', newTDMPData)
          setShow(false)
      }
  
  
  // DELETE BUTTON METHODS
  const [DeleteDate, setDeleteDate] = useState(0);
  
   function handleShowDeleteModal(date){
      console.log('date ---->', date)
      setDeleteDate(date)
      setShowDeleteModal(true);
  }
  
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  
  const handleCloseDeleteModal = () => setShowDeleteModal(false);
  
  function  submitDeleteModal() {
      backend.delete(`/totalyDailyMilk/${DeleteDate}`)
      setShowDeleteModal(false);
      setTotalyMPD([])
  }
  
  
  
  
  // EDIT BUTTON METHODS
  const [EditDate, setEditDate] = useState(0);
  
   function handleShowEditModal(milk){
      setEditDate(milk.date)
      setnewTDMPData(milk)
      console.log('id ---->', EditDate)
      setShowEditModal(true);
  }
  
  const [showEditModal, setShowEditModal] = useState(false);
  
  const handleCloseEditModal = () => setShowEditModal(false);
  
  function  submitEditeModal() {
      backend.put(`/totalyDailyMilk/${EditDate}`, {
        "milkQuantity": newTDMPData.milkQuantity,
        "date": newTDMPData.date,
      })
      setShowEditModal(false);
     // setRegData([])
  }
    return (
        <div className="Reg"> 
            <div className="headpart">
            <button  className="btn btn-success " onClick={handleShow}>إضافة</button>
            <h1>   تسجيل انتاج الحليب اليومي الكلي  </h1>
            </div>
          <div className="container"> 
          <table className="table table-striped table-bordered table-hover">
            <thead>
           <tr className="table-success">
       
        
           <th className="text-center">  كمية الحليب باللتر  </th>
           <th className="text-center">  اليوم  </th>
           <th className="text-center">تعديل</th>
           <th className="text-center">حذف</th>
           
           </tr>
            </thead>
            <tbody>
                {
                    totalydailymilkproductonData.map(
                        (milk, key) => (  
                            <tr key={key}>
                                <td className="text-center">{milk.milkQuantity}</td>
                                <td className="text-center">{milk.date}</td>
                                <td className="text-center"><button className="btn btn-secondary" onClick={milk.id === "جار تحميل البيانات ..."?()=>{}:()=>handleShowEditModal(milk)}>تعديل</button></td>
                                <td className="text-center"><button className="btn btn-danger" onClick={milk.date === "جار تحميل البيانات ..."?()=>{}:()=>handleShowDeleteModal(milk.date)}>حذف</button></td>
                               
                           </tr>
                        )
                    )
                }
          
            </tbody>
          </table>
         </div>
     

       


         
         <Modal show={show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title className="ms-auto"> إضافة البيانات </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="container m-6">
                            <form className="form-inline ">
                                <label >      كمية   الحليب    باللتر    </label>
                                <input type="number" className="form-control" onChange={(e) => hundlSave(e)} id="milkQuantity" value={newTDMPData.milkQuantity} />
                                <label> اليوم</label>
                                <input    type="date" className="form-control" onChange={(e) => hundlSave(e)} id="date" value={newTDMPData.date} placeholder="date" />
                            </form>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer style={{
                    display: "flex",
                    justifyContent: "center",
                }}>
                    <Button variant="btn btn-success" onClick={submitAddModal} > حفظ</Button>
                    <Button variant="secondary" onClick={handleClose}>إلغاء</Button>
                </Modal.Footer>
            </Modal>



            <Modal show={showDeleteModal} onHide={handleCloseDeleteModal} aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                   <Modal.Title className="ms-auto">حذف البيانات</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="container m-6">
                            <form className="form-inline ">
                            هل انت متأكد انك تريد حذف بيانات اليوم {DeleteDate}
                            </form>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer style={{
                    display: "flex",
                    justifyContent: "center",
                }}>
                    <Button variant="btn btn-success" onClick={submitDeleteModal} > تأكيد</Button>
                    <Button variant="secondary" onClick={handleCloseDeleteModal}>إلغاء</Button>
                </Modal.Footer>
            </Modal>





            
            <Modal show={showEditModal} onHide={handleCloseEditModal} aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                <Modal.Title className="ms-auto">           هل انت متأكد انك تريد تعديل بيانات اليوم {EditDate}            </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <form>
                        <div className="container m-6">
                            <form className="form-inline ">
                            <label >      كمية   الحليب    باللتر    </label>
                                <input type="number" className="form-control" onChange={(e) => hundlSave(e)} id="milkQuantity" value={newTDMPData.milkQuantity} placeholder="" />
                                <label> اليوم</label>
                                <input type="date" className="form-control " onChange={(e) => hundlSave(e)} id="date" value={newTDMPData.date} placeholder="date" />
                            </form>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer style={{
                    display: "flex",
                    justifyContent: "center",
                }}>
                    <Button variant="btn btn-success" onClick={submitEditeModal} > تأكيد</Button>
                    <Button variant="secondary" onClick={handleCloseEditModal}>إلغاء</Button>
                </Modal.Footer>
            </Modal>




        </div>
 
    );
            }