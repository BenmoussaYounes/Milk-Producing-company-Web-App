const express = require('express')
const router = express.Router()
const registeringdata = require('./../../database/registering_Data.json')
// use-cases
const addR = require('./../../domain/use_cases/registering/addR');
const deleteR = require('./../../domain/use_cases/registering/deleteR');
const editR = require('./../../domain/use_cases/registering/editR');
router.get("/",(req, res) => {
    res.json(registeringdata)
})

router.post("/",(req, res) => {
    addR(res,req.body)
})

router.delete("/:id",(req, res) => {
    console.log(req.params.id)
    deleteR(res,req.params.id)
})


router.put("/:id",(req, res) => {
    editR(res,req.params.id,req.body)
})


module.exports = router;