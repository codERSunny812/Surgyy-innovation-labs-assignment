const express = require('express')
const PatientRouter = express.Router();
const { body } = require('express-validator');
const { addPatient, getPatientData, treatPatient, dischargePatient } = require('../controller/patient.controller');

PatientRouter.get('/',(req,res)=>{
    res.send("hello from patient  route")
})

// route to add the patient 
PatientRouter.post('/add-patient',[
    body('name').notEmpty().withMessage('Name is required'),
    body('triageLevel').isInt({ min: 1, max: 5 }).withMessage('Triage level must be between 1 and 5')
],addPatient)

// route to get the patient from the queue
PatientRouter.get('/get-patient',getPatientData)

// Move a patient to "being treated" status
PatientRouter.put('/:id/treat',treatPatient);

// Discharge a patient
PatientRouter.delete('/:id',dischargePatient);




module.exports=PatientRouter