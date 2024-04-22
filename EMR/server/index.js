const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const Patient = require("./models/Patient");
const HealthCard = require("./models/HealthCard");
const Condition = require("./models/Condition");

// tests
const Test = require('./models/Tests/Test');
const TestOrder = require('./models/Tests/TestOrder');
const TestResults = require('./models/Tests/TestResults');

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

// get all types of medical tests
app.get('/tests', async (req, res) => {
    try {
        const tests = await Test.find({});
        res.status(200).send(tests);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
})

// create new test order
app.post('/tests/order', async (req, res) => {
    try {
        const order = new Test(req.body);
        await order.save();
        res.status(201).send({ message: "successfully submitted a test order!", order: order });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
})

// get all test orders
app.get('/tests/orders', async (req, res) => {
    try {
        const orders = await TestOrder.find({});
        if (!orders) {
            return res.status(404).send({ error: "no active tests" });
        }
        res.status(200).send(orders);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
})

// get one specific test order
app.get('/tests/orders/:id', async (req, res) => {
    try {
        const order = await TestOrder.findById(req.params.id);
        if (!order) {
            return res.status(404).send({ error: `no test with id ${req.params.id}` });
        }
        res.status(200).send(order);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
})

//edit one specific test order
app.patch('/tests/orders/:id', async(req, res) => {
    try {
        let order = await TestOrder.findById(req.params.id);
        const values = req.body;
        if (!order) {
            return res.status(404).send({ error: `no test with id ${req.params.id}` });
        }
        for (indValue in values) {
            order[indValue] = values[indValue];
            // for each value in values (request body), replace the test order values with the updated values
        }
        await order.save();
        return res.status(200).send({ message: `successfully updated test order with id ${req.params.id}`, updatedOrder: order })
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
})

// create new test results
app.post('/tests/results/:id', async (req, res) => {
    try {
        const results = new TestResults(req.body);
        let test = await TestOrder.findById(req.params.id);
        test.results = results;
        await results.save();
        await test.save();
        res.status(201).send({ message: "successfully submitted test results!", updatedTest: test });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
})

// get all test results
app.get('/tests/results', async(req, res) => {
    try {
        const results = await TestResults.find({});
        if (!results) {
            return res.status(404).send({ error: "no active test results" });
        }
        res.status(200).send(results);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
})

// get one specific set of test results
app.get('/tests/results/:id', async(req, res) => {
    try {
        const result = await TestResults.findById(req.params.id);
        if (!result) {
            return res.status(404).send({ error: `no test results with id ${req.params.id}` });
        }
        res.status(200).send(result);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
})

// edit test results
app.patch('/tests/results/:id', async(req, res) => {
    try {
        let result = await TestResults.findById(req.params.id);
        const values = req.body;
        if (!result) {
            return res.status(404).send({ error: `no test results with id ${req.params.id}` });
        }
        for (indValue in values) {
            result[indValue] = values[indValue];
            // for each value in values (request body), replace the test result values with the updated values
        }
        await result.save();
        return res.status(200).send({ message: `successfully updated results with id ${req.params.id}`, updatedResults: result })
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
})

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

// todo add endpoints for health card / conditions
