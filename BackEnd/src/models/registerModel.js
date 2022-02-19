const {Schema,model} = require("mongoose");

const employeeSchema = new Schema({
    fname : {type : String ,required:true},
    lname : {type : String, required:true},
    email : {type : String, required:true, unique:true},
    password : {type : String, required:true}
},{
    versionKey:false,
    timestamps:true,
});

module.exports =  model("Register" , employeeSchema)