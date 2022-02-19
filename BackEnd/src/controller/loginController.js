
const express = require("express");
const registerEmployee = require("../models/registerModel");
const router = express.Router();

router.post("/" , async (req,res) => {
    try{
        const email = req.body.email;
        const password = req.body.password;

        const logEmp = await registerEmployee.findOne({email});
        if(logEmp.password === password && logEmp.email === email){
        return res.status(201).render("dashboard")
        }else{
            res.send("Email or password are not matching")
        }
     }catch(e){
         res.status(400).send(e)
    }
});

module.exports = router