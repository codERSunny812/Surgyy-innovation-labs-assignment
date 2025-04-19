const { v4: uuidv4 } = require('uuid');
const PriorityQueue = require('../service/PriorityQueue');
const { validationResult } = require('express-validator')

const addPatient = (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {


        const { name, triageLevel } = req.body;

        if (!name || !triageLevel || triageLevel < 1 || triageLevel > 5) {
            return res.status(400).json({ message: 'Invalid patient data' });
        }

        const patientData = {
            id: uuidv4(),
            name,
            triageLevel,
            timestamp: Date.now()
        }



        PriorityQueue.addPatient(patientData);

        if (triageLevel === 1) {
            req.app.get('io').emit('criticalAlert', { message: 'Critical patient arrived!', patientData });
        }

        const STAFF_COUNT = 3; // Assume 3 doctors available
        const maxPatients = STAFF_COUNT * 3; // Safe threshold: 1 doctor per 3 patients

        if (PriorityQueue.getQueue().length > maxPatients) {
            req.app.get('io').emit('staffAlert', { message: 'ER is overcrowded!' });
        }


        req.app.get('io').emit('updateQueue', PriorityQueue.getQueue()); // Emit update
        res.status(201).json({ message: 'Patient added', patientData });
    } catch (error) {
        console.log("getting error in adding the patient");
        res.status(500).json({ message: "Error adding patient", error: error.message });
    }
}

const getPatientData = (req,res)=>{
    try {
        res.json({
            message: "the data of patient in queue",
            data: PriorityQueue.getQueue()
        }) 
    } catch (error) {
        console.log("error in getting the data",error)
    }
    
}


const treatPatient = (req, res) => {
    const patient = PriorityQueue.treatPatient();
    if (!patient) {
        return res.status(404).json({ message: 'No patients in queue' });
    }
    req.app.get('io').emit('updateQueue', PriorityQueue.getQueue()); // Emit update
    res.json({ message: 'Patient is being treated', patient });
}


const dischargePatient = (req, res) => {
    const { id } = req.params;
    PriorityQueue.removePatient(id);
    req.app.get('io').emit('updateQueue', PriorityQueue.getQueue()); // Emit update
    res.json({ message: 'Patient discharged' });
}







module.exports={addPatient,getPatientData,treatPatient,dischargePatient}