const express = require("express");
const app = express();
const registerController = require("./controller/registerController");
const loginController = require("./controller/loginController");
const employeeController = require("./controller/employeeController");

const bodyparser = require('body-parser');

app.use(express.static("public"));
app.set("view engine" , "hbs");

app.use(express.json());
app.use(express.urlencoded({extended:false}))

app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.json())

app.get("/", (req,res) => {
    res.render("index");
});
app.get("/login", (req,res) => {
    res.render("login");
});
app.get("/register", (req,res) => {
    res.render("register");
});
app.get("/employee", (req,res) => {
    res.render("dashboard");
});
app.get("/addemployee", (req,res) => {
    res.render("addemployee");
});

//create a new employee in our database
app.use("/register", registerController);
app.use("/login" , loginController);
app.use("/employee" , employeeController);


module.exports = app;