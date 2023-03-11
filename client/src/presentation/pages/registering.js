
import { useState, useEffect } from "react";

import { Modal, Button } from "react-bootstrap";

import backend from "../../data/data_source/api/entity/axiosAPI";

export default function Registering() {


  
    const [registeringData, setRegData] = useState([
        {
            "id": "جار تحميل البيانات ...",
            "date": "جار تحميل البيانات ...",
            "name": " جار تحميل البيانات ...",
        },
    ])
    useEffect(
        () => {
            async function fetchData() {
                const request = await backend.get('/registering')
                setRegData(request.data)
                //  console.log('Data -> ',request)
                return request
            }
            fetchData();
        }, [registeringData]);

    // --- Form Methods 

    const handleShow = () => setShow(true);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    // Save 
    const [newRegData, setnewRegData] = useState(
        {
            "id": "",
            "date": "",
            "name": "",
        }
    );
    function hundlSave(e) {
        const newData = { ...newRegData }
        newData[e.target.id] = e.target.value
        setnewRegData(newData)
        console.log(newData)
    }

    function submitAddModal() {
        backend.post('/registering', {
            "id": newRegData.id,
            "date": newRegData.date,
            "name": newRegData.name,
        })
        console.log('DATA', newRegData)
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
    backend.delete(`/registering/${DeleteId}`)
    setShowDeleteModal(false);
    setRegData([])
}




// EDIT BUTTON METHODS
const [EditId, setEditId] = useState(0);

 function handleShowEditModal(cow){
    setnewRegData(cow)
    setEditId(cow.id)
    console.log('id ---->', EditId)
    setShowEditModal(true);
}

const [showEditModal, setShowEditModal] = useState(false);

const handleCloseEditModal = () => setShowEditModal(false);

function  submitEditeModal() {
    backend.put(`/registering/${EditId}`, {
        "id": newRegData.id,
        "date": newRegData.date,
        "name": newRegData.name,
    })
    setShowEditModal(false);
   // setRegData([])
}

    return (
        <div className="Reg">
            <div className="headpart">
                <button className="btn btn-success" onClick={handleShow} data-target="#mymodal">إضافة</button>
                <h1>تسجيل البقر</h1>

            </div>
            <div className="container">
                <table className="table table-striped table-bordered table-hover">
                    <thead>
                        <tr className="table-success">
                            <th className="text-center">رقم البقرة</th>
                            <th className="text-center">تاريخ دخولها</th>
                            <th className="text-center">سلالة</th>
                            <th className="text-center">تعديل</th>
                            <th className="text-center">حذف</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            registeringData.map(
                                (cow, key) => (
                                    <tr key={key}>
                                        <td className="text-center">{cow.id}</td>
                                        <td className="text-center">{cow.date}</td>
                                        <td className="text-center">{cow.name}</td>
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
                                <input type="number" className="form-control" onChange={(e) => hundlSave(e)} id="id" value={newRegData.id} placeholder="id" />
                                <label>تاريخ دخولها</label>
                                <input type="date" className="form-control" onChange={(e) => hundlSave(e)} id="date" value={newRegData.date} placeholder="date" />
                                <label>سلالة</label>
                                <input type="text" className="form-control " onChange={(e) => hundlSave(e)} id="name" value={newRegData.name} placeholder="name" />
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
                            <th className="text-center">رقم البقرة</th>
                            <input type="number" className="form-control" onChange={(e) => hundlSave(e)} id="id" value={newRegData.id} placeholder="id" />
                                <label>تاريخ دخولها</label>
                                <input type="date" className="form-control" onChange={(e) => hundlSave(e)} id="date" value={newRegData.date} placeholder="date" />
                                <label>سلالة</label>
                                <input type="text" className="form-control " onChange={(e) => hundlSave(e)} id="name" value={newRegData.name} placeholder="name" />
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
