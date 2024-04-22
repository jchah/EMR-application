const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const Patient = require("./models/Patient");
const HealthCard = require("./models/HealthCard");
const Condition = require("./models/Condition");

const app = express();
const port = 3000;

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

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

// todo add endpoints for health card / conditions
