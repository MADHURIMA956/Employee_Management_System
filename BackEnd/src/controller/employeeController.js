const express = require("express");
const EmployeeDetail = require("../models/employeeModel");

const router = express.Router();

router.post("/",async(req,res) => {
    try{
        const regEmp = await EmployeeDetail.create(req.body);
       return res.status(201).json({regEmp})
    }catch(e){
        res.status(400).send(e)
    }
});

module.exports = router