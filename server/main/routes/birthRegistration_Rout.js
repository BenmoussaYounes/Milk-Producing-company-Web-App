const express = require('express');
const EditR = require('../../domain/use_cases/registering/editR');
const router = express.Router()
const birthRegistration_Data = require('./../../database/birthRegistration_Data.json')
// use-cases

const addBR = require('./../../domain/use_cases/birthRegistration/addBR');
const deleteBR = require('./../../domain/use_cases/birthRegistration/deleteBR');
const editBR = require('./../../domain/use_cases/birthRegistration/editBR');


router.get("/",(req, res) => {
    res.json(birthRegistration_Data)
})

router.post("/",(req, res) => {
    addBR(res,req.body)
})

router.delete("/:id",(req, res) => {
    console.log(req.params.id)
    deleteBR(res,req.params.id)
})

router.put("/:id",(req, res) => {
   editBR(res, req.params.id, req.body)
})

module.exports = router;