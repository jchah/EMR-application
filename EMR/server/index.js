const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
const twilioClient = require('./controllers/twillio.js')
// const nodemailer = require('nodemailer');
// const cron = require('node-cron');
require('./db');

const { Patient, Medicine } = require("./models/Patient");
const Appointment = require("./models/Appointment");
//const Medicine = require('./models/Condition');

const UserRouter = require("./routes/user.js");

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

app.use("/user", UserRouter);

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

// Create a new condition
// app.post("/conditions", async (req, res) => {
//     try {
//         const newCondition = new Condition(req.body);
//         await newCondition.save();
//         res.status(201).send(newCondition);
//     } catch (error) {
//         res.status(400).send({ message: error.message });
//     }
// });

// Get all conditions
// app.get("/conditions", async (req, res) => {
//     try {
//         const conditions = await Condition.find();
//         res.status(200).send(conditions);
//     } catch (error) {
//         res.status(500).send({ message: error.message });
//     }
// });

// // Get condition by ID
// app.get("/conditions/:id", async (req, res) => {
//     try {
//         const condition = await Condition.findById(req.params.id);
//         if (!condition) {
//             return res.status(404).send({ message: "Condition not found" });
//         }
//         res.status(200).send(condition);
//     } catch (error) {
//         res.status(500).send({ message: error.message });
//     }
// });

// // Update a condition by ID
// app.put("/conditions/:id", async (req, res) => {
//     try {
//         const updatedCondition = await Condition.findByIdAndUpdate(
//             req.params.id,
//             req.body,
//             { new: true, runValidators: true }
//         );
//         if (!updatedCondition) {
//             return res.status(404).send({ message: "Condition not found" });
//         }
//         res.status(200).send(updatedCondition);
//     } catch (error) {
//         res.status(400).send({ message: error.message });
//     }
// });

// // Delete a condition by ID
// app.delete("/conditions/:id", async (req, res) => {
//     try {
//         const deletedCondition = await Condition.findByIdAndDelete(req.params.id);
//         if (!deletedCondition) {
//             return res.status(404).send({ message: "Condition not found" });
//         }
//         res.status(200).send(deletedCondition);
//     } catch (error) {
//         res.status(500).send({ message: error.message });
//     }
// });

// Add an appointment
app.post("/appointments", async (req, res) => {
    
    try {

        let a = req.body.patientDeats
        let fn = a.substring(0, a.indexOf(" "));
        let ln = a.substring(a.indexOf(" ") +1, a.indexOf(",") )
        let cn = a.substring(a.lastIndexOf(" ") + 1);
        let patient = await Patient.findOne({firstName: fn, lastName: ln, cardNumber: cn})
        let appointment = new Appointment({
            patient: patient,
            date: req.body.date, 
            startTime: req.body.startTime, 
            endTime: req.body.endTime, 
            notes: req.body.notes
        });
        console.log(appointment)
        await appointment.save();
        res.send(appointment);
    } catch (error) {
        res.status(500).send({ message: error.message });
       
    }
});

// Gets all appointments
app.get('/calendar/appointments', async (req, res) => {
    try {
        const appointments = await Appointment.find({ date: req.query.date });
        res.status(200).send(appointments);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

app.get('/appointments', async (req, res) => {
    try {
        const appointments = await Appointment.find();
        res.status(200).send(appointments)
    } catch (error) {
        res.status(500).send({ message : error.message})
    }
})

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

// delete an appointment 
app.delete("/appointments/patient/:patientId", async (req, res) => {
    try {
        const result = await Appointment.deleteMany({ patient: req.params.patientId });
        if (result.deletedCount === 0) {
            return res.status(404).send({ message: "No appointments found for this patient to delete" });
        }
        res.status(200).send({ message: "Appointments deleted successfully" });
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

// Create a new treatment
app.post("/treatments", async (req, res) => {
    try {
        const newTreatment = new Medicine(req.body);
        await newTreatment.save();
        res.status(201).send(newTreatment);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
});

// Get all treatments
app.get("/treatments", async (req, res) => {
    try {
        const treatments = await Medicine.find();
        res.status(200).send(treatments);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

// Get treatment by ID
app.get("/treatments/:id", async (req, res) => {
    try {
        const treatment = await Medicine.findById(req.params.id);
        if (!treatment) {
            return res.status(404).send({ message: "Treatment not found" });
        }
        res.status(200).send(treatment);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

// Update a treatment by ID
app.put("/treatments/:id", async (req, res) => {
    try {
        const updatedTreatment = await Medicine.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedTreatment) {
            return res.status(404).send({ message: "Treatment not found" });
        }
        res.status(200).send(updatedTreatment);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
});

// Delete a treatment by ID
app.delete("/treatments/:id", async (req, res) => {
    try {
        const deletedTreatment = await Medicine.findByIdAndDelete(req.params.id);
        if (!deletedTreatment) {
            return res.status(404).send({ message: "Treatment not found" });
        }
        res.status(200).send(deletedTreatment);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

// twillio notifications

async function sendSMS(to, message) {
    console.log(message)
    try {
        const response = await twilioClient.messages.create({
            body: message,
            to: to,  // Text this number
            from: '+13855577185' // From a valid Twilio number
        });
        console.log('SMS sent successfully!', response.sid);
    } catch (error) {
        console.error('Failed to send SMS.', error);
    }
}

app.post('/send-sms', async (req, res) => {
    const { to, message } = req.body;
    try {
        await sendSMS(to, message);
        res.status(200).send({ message: 'SMS sent successfully!' });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

// node mailer and node cron

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

async function sendEmail(to, subject, text) {
    let mailOptions = {
        from: process.env.EMAIL_USER,
        to: to,
        subject: subject,
        text: text
    }

    transporter.sendMail(mailOptions, function(error, info) {
        if(error)
            console.log('error occured with sending email', error.message)
        else {
            console.log('email sent successfully', info.response)
        }
    })
}

app.post('/send-email', async (req, res) => {
    const { to, subject, text } = req.body
    try {
        await sendEmail(to, subject, text)
        res.status(200).send({ message: 'Email sent successfully!' })
    } catch (e) {
        res.status(500).send({ message: e.message })
    }
})

// // Step 2: Define the email options
// let mailOptions = {
//     from: process.env.EMAIL_USER,
//     to: 'recipient-email@example.com',
//     subject: 'Scheduled Email from Node.js',
//     text: 'This is a test email sent at a scheduled time.',
// };

// // Step 3: Define the cron job
// cron.schedule('0 9 * * *', () => { // This cron job will run every day at 9:00 AM
//     transporter.sendMail(mailOptions, function(error, info){
//         if (error) {
//             console.log('Error occurred: ' + error.message);
//         } else {
//             console.log('Email sent successfully: ' + info.response);
//         }
//     });
// }, {
//     scheduled: true,
//     timezone: "America/New_York" // Set the desired timezone
// });

// console.log('Cron job scheduled to send email at 9:00 AM every day');