const express = require('express');

const router = express.Router()
const totalyDailyMilk_Data = require('./../../database/totalDailyMilkP_Data.json')
// use-cases

const addTDMP = require('../../domain/use_cases/totalDailyMilkProduction/addTDMP');
const deleteTDMP = require('../../domain/use_cases/totalDailyMilkProduction/deleteTDMP');
const editTDMP = require('../../domain/use_cases/totalDailyMilkProduction/editTDMP');
router.get("/",(req, res) => {
    res.json(totalyDailyMilk_Data)
})

router.post("/",(req, res) => {
    addTDMP(res,req.body)
})

router.delete("/:id",(req, res) => {
    deleteTDMP(res,req.params.id)
})

router.put("/:date",(req, res) => {
    editTDMP(res, req.params.date, req.body)
})

module.exports = router;