const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
require('./db')

const Patient = require("./models/Patient");
const Appointment = require("./models/Appointment");
const Condition = require("./models/Condition");
const Medicine = require('./models/Medicine');

const app = express();
dotenv.config();

const port = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Create a new patient
app.post("/patients", async (req, res, next) => {
    try {
        const newPatient = new Patient(req.body);
        await newPatient.save();
        res.status(201).send(newPatient);
    } catch (error) {
        next(error);
    }
});

// Read all patients
app.get("/patients", async (req, res, next) => {
    try {
        const patients = await Patient.find();
        res.status(200).send(patients);
    } catch (error) {
        next(error);
    }
});

// Read a single patient by ID
app.get("/patients/:id", async (req, res, next) => {
    try {
        const patient = await Patient.findById(req.params.id);
        if (!patient) {
            return res.status(404).send({ message: "Patient not found" });
        }
        res.status(200).send(patient);
    } catch (error) {
        next(error);
    }
});

// Update a patient by ID
app.put("/patients/:id", async (req, res, next) => {
    try {
        const updatedPatient = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedPatient) {
            return res.status(404).send({ message: "Patient not found" });
        }
        res.status(200).send(updatedPatient);
    } catch (error) {
        next(error);
    }
});

// Delete a patient by ID
app.delete("/patients/:id", async (req, res, next) => {
    try {
        const deletedPatient = await Patient.findByIdAndDelete(req.params.id);
        if (!deletedPatient) {
            return res.status(404).send({ message: "Patient not found" });
        }
        res.status(200).send(deletedPatient);
    } catch (error) {
        next(error);
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
        const appointments = await Appointment.find();
        res.status(200).send(appointments);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

// Add an appointment
app.post("/appointments", async (req, res) => {
    try {
        let appointment = new Appointment(req.body);
        await appointment.save()
        res.send(appointment)

    } catch (error) {
        res.status(400).send({ message: error.message });
    }
});

// Get a single appointment by id
app.get("/appointments/:id", async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id);
        if (!appointment) {
            return res.status(404).send({ message: "Appointment not found" });
        }
        res.status(200).send(appointment);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

// Update an appointment by id
app.put("/appointments/:id", async (req, res) => {
    try {
        const updatedAppointment = await Appointment.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedAppointment) {
            return res.status(404).send({ message: "Appointment not found" });
        }
        res.status(200).send(updatedAppointment);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
});

// Remove an appointment by id
app.delete("/appointments/:id", async (req, res) => {
    try {
        const deletedAppointment = await Appointment.findByIdAndDelete(req.params.id);
        if (!deletedAppointment) {
            return res.status(404).send({ message: "Appointment not found" });
        }
        res.status(200).send(deletedAppointment);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

// Error Handling Middleware
app.use((err, req, res, next) => {
    res.status(err.status || 500).send({
        message: err.message || 'Internal Server Error'
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

// Get all medicine
app.get("/medicine", async (req, res) => {
    try {
        const medicine = await Medicine.find();
        res.status(200).send(medicine);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

// Create a new medicine
app.post("/medicine", async (req, res) => {
    try {
        const newMedicine = new Medicine(req.body);
        await newMedicine.save();
        res.status(201).send(newMedicine);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
});


// Update a medicine by ID
app.put("/medicine/:id", async (req, res) => {
    try {
        const updatedMedicine = await Medicine.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedMedicine) {
            return res.status(404).send({ message: "Medicine not found" });
        }
        res.status(200).send(updatedMedicine);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
});


// Delete a condition by ID
app.delete("/medicine/:id", async (req, res) => {
    try {
        const deletedMedicine = await Medicine.findByIdAndDelete(req.params.id);
        if (!deletedMedicine) {
            return res.status(404).send({ message: "Medicine not found" });
        }
        res.status(200).send(deletedMedicine);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});
