const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const Incident = require("./models/Incident");
const Contact = require("./models/Contact");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Test route
app.get("/", (req, res) => {
    res.send("Backend is running");
});

// Incident API
app.post("/incidents", async (req, res) => {
    const incident = new Incident(req.body);
    await incident.save();
    res.json({ message: "Incident saved successfully" });
});

app.get("/incidents", async (req, res) => {
    const incidents = await Incident.find();
    res.json(incidents);
});

// Contact API
app.post("/contacts", async (req, res) => {
    const contact = new Contact(req.body);
    await contact.save();
    res.json({ message: "Message sent successfully" });
});

// Start server
app.listen(5000, () => {
    console.log("Server running on port 5000");
});
app.post("/contacts", async (req, res) => {
    const contact = new Contact(req.body);
    await contact.save();

    res.json({
        success: true,
        message: "Thank you! Your message has been sent."
    });
});app.post("/contacts", async (req, res) => {
    const contact = new Contact(req.body);
    await contact.save();

    res.json({
        message: "Successfully sent message"
    });
});
