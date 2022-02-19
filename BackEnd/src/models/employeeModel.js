const {Schema,model} = require("mongoose");

const employeeDetailSchema = new Schema({
    name : {type : String ,required:true},
    department : {type : String, required:true},
    gender : {type : String, required:true, unique:true},
    joining_date : {type : Date, required:true},
    salary : {type : Number, required:true},
},{
    versionKey:false,
    timestamps:true,
});

module.exports =  model("EmployeeDetail" , employeeDetailSchema)