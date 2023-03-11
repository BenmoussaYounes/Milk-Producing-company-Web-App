
import { useState, useEffect } from "react";
import backend from "../../data/data_source/api/entity/axiosAPI";

import { Modal, Button } from "react-bootstrap";

export default function MedicalExaminationRegistration(){

    const [medicalExaminationRegistrationData, setmedicalERD] = useState([
        {
            "id":  "جار تحميل البيانات ...",
            "date": "جار تحميل البيانات ...",
            "illness": " جار تحميل البيانات ...",
        },
    ])

      useEffect(
        ()=>{
            async function fetchData(){
               const request = await backend.get('/medicalExaminationRegistraion')
               setmedicalERD(request.data)
             //  console.log('Data -> ',request)
               return request
            }
            fetchData();
        },[medicalExaminationRegistrationData]);
      // --- Form Methods 

      const handleShow = () => setShow(true);

      const [show, setShow] = useState(false);
  
      const handleClose = () => setShow(false);
  // Save 
  const [newMERData, setnewMERData] = useState(
    {
        "id": "5",
        "date": "2023/06/24",
        "illness": "نتفاخ الكرش الحاد "
    }
);
function hundlSave(e) {
    const newData = { ...newMERData }
    newData[e.target.id] = e.target.value
    setnewMERData(newData)
    console.log(newData)
}

function submitAddModal() {
    backend.post('/medicalExaminationRegistraion', {
        "id": newMERData.id,
        "date": newMERData.date,
        "illness": newMERData.illness,
    })
    console.log('DATA', newMERData)
    setShow(false)
}


// DELETE BUTTON METHODS
const [DeleteId, setDeleteId] = useState(0);

function handleShowDeleteModal(id){
console.log('id ---->', id)
setDeleteId(id)
setShowDeleteModal(true);
}

const [showDeleteModal, setShowDeleteModal] = useState(false);

const handleCloseDeleteModal = () => setShowDeleteModal(false);

function  submitDeleteModal() {
backend.delete(`/medicalExaminationRegistraion/${DeleteId}`)
setShowDeleteModal(false);
setnewMERData([])
}




// EDIT BUTTON METHODS
const [EditId, setEditId] = useState(0);

function handleShowEditModal(cow){
setEditId(cow.id)
setnewMERData(cow)
//console.log('id ---->', cow.EditId)
setShowEditModal(true);
}

const [showEditModal, setShowEditModal] = useState(false);

const handleCloseEditModal = () => setShowEditModal(false);

function  submitEditeModal() {
    console.log(newMERData)
    console.log(DeleteId)
backend.put(`/medicalExaminationRegistraion/${EditId}`, {
    "id": newMERData.id,
    "date": newMERData.date,
    "illness": newMERData.illness,
})
setShowEditModal(false);
// setRegData([])
}

    return (
        <div className="Reg"> 
            <div className="headpart">
            <button  className="btn btn-success " onClick={handleShow}>إضافة</button>
            <h1>تسجيل الفحص الطبي</h1>
            </div>
          <div className="container"> 
          <table className="table table-striped table-bordered table-hover">
            <thead>
           <tr className="table-success">
                        <th className="text-center">رقم البقرة</th>
                        <th className="text-center">يوم الفحص</th>
                        <th className="text-center">  المرض</th>
                        <th className="text-center">تعديل</th>
                        <th className="text-center">حذف</th>
           </tr>
            </thead>
            <tbody>
                {
                    medicalExaminationRegistrationData.map(
                        (cow, key) => (  
                            <tr key={key}>
                                <td className="text-center">{cow.id}</td>
                                <td className="text-center">{cow.date}</td>
                                <td className="text-center">{cow.illness}</td>
                                <td className="text-center"><button className="btn btn-secondary" onClick={cow.id === "جار تحميل البيانات ..."?()=>{}:()=>handleShowEditModal(cow)}>تعديل</button></td>
                                <td className="text-center"><button className="btn btn-danger" onClick={cow.id === "جار تحميل البيانات ..."?()=>{}:()=>handleShowDeleteModal(cow.id)}>حذف</button></td>
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
                                <label >رقم البقرة</label>
                                <input type="number" className="form-control" onChange={(e) => hundlSave(e)} id="id" value={newMERData.id} placeholder="id" />
                                <label>يوم الفحص  </label>
                                <input type="date" className="form-control" onChange={(e) => hundlSave(e)} id="date" value={newMERData.date} placeholder="date" />
                                <label>المرض</label>
                                <input type="text" className="form-control " onChange={(e) => hundlSave(e)} id="illness" value={newMERData.illness} placeholder="illness" />
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
                            هل أنت متأكد أنك تريد حذف بيانات البقرة ( رقم البقرة : {DeleteId})
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
                <Modal.Title className="ms-auto">  هل انت متأكد انك تريد تعديل بيانات البقرة (رقم البقرة : {EditId})</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <form>
                        <div className="container m-6">
                            <form className="form-inline ">
                            <label >رقم البقرة</label>
                            <input type="number" className="form-control" onChange={(e) => hundlSave(e)} id="id" value={newMERData.id} placeholder="id" />
                            <label>يوم الفحص  </label>
                                <input type="date" className="form-control" onChange={(e) => hundlSave(e)} id="date" value={newMERData.date} placeholder="date" />
                                <label>المرض</label>
                                <input type="text" className="form-control " onChange={(e) => hundlSave(e)} id="illness" value={newMERData.illness} placeholder="illness" />
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