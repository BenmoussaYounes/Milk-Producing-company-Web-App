const express = require('express')
const router = express.Router()
const medicalExaminationRegistration_Data = require('./../../database/medicalExaminationRegistration_Data.json')
// use-cases

const addMER = require('./../../domain/use_cases/medicalExaminationRegistration/addMER');
const deleteMER = require('./../../domain/use_cases/medicalExaminationRegistration/deleteMER');
const editMER = require('./../../domain/use_cases/medicalExaminationRegistration/editMER');

router.get("/",(req, res) => {
    res.json(medicalExaminationRegistration_Data)
})

router.post("/",(req, res) => {
    addMER(res,req.body)
})

router.delete("/:id",(req, res) => {
    deleteMER(res,req.params.id)
})

router.put("/:id",(req, res) => {
    editMER(res, req.params.id, req.body)
})

module.exports = router;