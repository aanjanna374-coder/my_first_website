const mongoose = require("mongoose");

const incidentSchema = new mongoose.Schema({
    name: String,
    type: String,
    location: String,
    date: String
});

module.exports = mongoose.model("Incident", incidentSchema);
