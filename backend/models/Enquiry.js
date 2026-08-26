const mongoose = require("mongoose");

const enquirySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
        message: {
            type: String,
            required: true
        },
        contacted: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);

const Enquiry = mongoose.model("Enquiry", enquirySchema);

module.exports = Enquiry;