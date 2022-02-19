const express = require("express");
const EmployeeDetail = require("../models/employeeModel");

const router = express.Router();

router.get('/', (req, res) => {
    res.render("addemployee", {
        viewTitle: "Insert Employee"
    });
})
router.post('/', (req, res) => {
    console.log(req.body.name)
    if (req.body._id == '')
        insertRecord(req, res);
        else
        updateRecord(req, res);
});


function insertRecord(req, res) {
    var employee = new EmployeeDetail();
    employee.name = req.body.name;
    employee.department = req.body.department;
    employee.gender = req.body.gender;
    employee.joining_date = req.body.joining_date;
    employee.salary = req.body.salary;

    employee.save((err, doc) => {
        if (!err)
            res.redirect('dashboard');
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("addemployee", {
                    viewTitle: "Insert Employee",
                    employee: req.body
                });
            }
            else
                console.log('Error during record insertion : ' + err);
        }
    });
}

function updateRecord(req, res) {
    EmployeeDetail.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('dashboard'); }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("addemployee", {
                    viewTitle: 'Update Employee',
                    employee: req.body
                });
            }
            else
                console.log('Error during record update : ' + err);
        }
    });
}


router.get('/employee', (req, res) => {
    EmployeeDetail.find((err, docs) => {
        if (!err) {
            res.render("dashboard", {
                list: docs
            });
        }
        else {
            console.log('Error in retrieving employee list :' + err);
        }
    });
});


function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'name':
                body['nameError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}

router.get('/:id', (req, res) => {
    EmployeeDetail.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("addemployee", {
                viewTitle: "Update Employee",
                employee: doc
            });
        }
    });
});

router.get('/delete/:id', (req, res) => {
    EmployeeDetail.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('addemployee');
        }
        else { console.log('Error in employee delete :' + err); }
    });
});

module.exports = router;