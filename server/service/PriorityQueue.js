class PriorityQueue{

    constructor(){
        this.queue = [];
    }

    addPatient(patientData){
     this.queue.push(patientData);

        this.queue.sort((a, b) => {
            if (a.triageLevel !== b.triageLevel) {
                return a.triageLevel - b.triageLevel; 
            }
            return a.timestamp - b.timestamp; 
        });
    }

    getQueue() {
        const now = Date.now();
        return this.queue.map((patient, index) => {
            const estimatedWaitTime = index * 5; // Assume each treatment takes 5 mins
            return { ...patient, estimatedWaitTime: `${estimatedWaitTime} mins` };
        });
    }



    treatPatient() {
        const index = this.queue.findIndex(patient => patient.triageLevel === 1);
        if (index !== -1) {
            return this.queue.splice(index, 1)[0];  // Remove Level 1 patient immediately
        }
        return this.queue.shift();  // Otherwise, treat the first patient in line
    }


    removePatient(id) {
        this.queue = this.queue.filter(patient => patient.id !== id);
    }


}



module.exports = new PriorityQueue()