const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require('cors');
const Patient = require("./models/Patient");
const Appointment = require("./models/Appointment")
const app = express();
const port = 3000;

app.use(cors())

app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/yourDatabaseName", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Create (Add new patient)
app.post("/patients", async (req, res) => {
    try {
        const newPatient = new Patient(req.body);
        await newPatient.save();
        res.status(201).send(newPatient);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
});

// Read (Get all patients)
app.get("/patients", async (req, res) => {
    try {
        const patients = await Patient.find();
        res.status(200).send(patients);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

// Read (Get a single patient by ID)
app.get("/patients/:id", async (req, res) => {
    try {
        const patient = await Patient.findById(req.params.id);
        if (!patient) {
            return res.status(404).send({ message: "Patient not found" });
        }
        res.status(200).send(patient);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

// Update (Update a patient by ID)
app.put("/patients/:id", async (req, res) => {
    try {
        const updatedPatient = await Patient.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedPatient) {
            return res.status(404).send({ message: "Patient not found" });
        }
        res.status(200).send(updatedPatient);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
});

// Delete (Remove a patient by ID)
app.delete("/patients/:id", async (req, res) => {
    try {
        const deletedPatient = await Patient.findByIdAndDelete(req.params.id);
        if (!deletedPatient) {
            return res.status(404).send({ message: "Patient not found" });
        }
        res.status(200).send(deletedPatient);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

// Get the health card of a specific patient
app.get("/patients/:id/healthcard", async (req, res) => {
    try {
        const patient = await Patient.findById(req.params.id);
        if (!patient) {
            return res.status(404).send({ message: "Patient not found" });
        }
        res.status(200).send(patient.healthCard); // Send the health card information
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

// Update the health card of a specific patient
app.put("/patients/:id/healthcard", async (req, res) => {
    try {
        const updatedPatient = await Patient.findByIdAndUpdate(
            req.params.id,
            { healthCard: req.body }, // Update health card info
            { new: true, runValidators: true }
        );
        if (!updatedPatient) {
            return res.status(404).send({ message: "Patient not found" });
        }
        res.status(200).send(updatedPatient.healthCard);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
});

// Get all conditions
app.get("/conditions", async (req, res) => {
    try {
        const conditions = await Condition.find();
        res.status(200).send(conditions);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

// Create a new condition
app.post("/conditions", async (req, res) => {
    try {
        const newCondition = new Condition(req.body);
        await newCondition.save();
        res.status(201).send(newCondition);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
});

// Update a condition by ID
app.put("/conditions/:id", async (req, res) => {
    try {
        const updatedCondition = await Condition.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedCondition) {
            return res.status(404).send({ message: "Condition not found" });
        }
        res.status(200).send(updatedCondition);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
});

// Delete a condition by ID
app.delete("/conditions/:id", async (req, res) => {
    try {
        const deletedCondition = await Condition.findByIdAndDelete(req.params.id);
        if (!deletedCondition) {
            return res.status(404).send({ message: "Condition not found" });
        }
        res.status(200).send(deletedCondition);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

// Get all conditions of a specific patient
app.get("/patients/:id/conditions", async (req, res) => {
    try {
        const patient = await Patient.findById(req.params.id).populate("conditions");
        if (!patient) {
            return res.status(404).send({ message: "Patient not found" });
        }
        res.status(200).send(patient.conditions);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

//gets all appointments
app.get('/calendar/appointments', async(req,res) =>{
    try {
        const appointments = await Appointment.find({});
        res.send(appointments);

    } catch (error) {
        res.status(500).send({error: error.message})
    }
})

//make an appointment
app.post('/calendar/appointments', async (req,res) => {
    try {
        let appointment = new Appointment(req.body);
        await appointment.save()
        res.send(appointment)

    } catch (error) {
        res.status(500).send({error: error.message})
    }
})

//edit appointment EDIT FOR LATER TO USE ID
app.patch('/calendar/edit/:id', async (req,res)=>{
    try {
        let appointment = Appointment.find({})
        const values = req.body;
        if (!appointment) {
            return res.status(404).send({ error: `no appoints with name ` });
        }
        for (indValue in values) {
            result[indValue] = values[indValue];
           //replaces old stuff w/ new stuff
        }
        await result.save();
        return res.status(200).send({ message: `successfully updated results with id ${req.params.id}`, updatedResults: result })
    } catch (error) {
        res.status(500).send({error: error.message})
    }
})

//delete appointment EDIT FOR LATER TO USE ID
app.delete('/calendar/delete/:id', async (req,res)=>{
    try {
        await Appointment.deleteMany({})
        res.status(200).json({ message: 'Appointment deleted successfully' });

    } catch (error) {
        console.error('Error deleting data:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
})

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
