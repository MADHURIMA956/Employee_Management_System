
const express = require("express");
const registerEmployee = require("../models/registerModel");
const router = express.Router();

router.post('/', async (req,res) => {
    try{
        const regEmp = await registerEmployee.create(req.body)
       return res.status(201).render("index")
    }catch(e){
        res.status(400).send(e)
    }
});

module.exports = router