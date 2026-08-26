const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

const Enquiry = require("./models/Enquiry");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch((error) =>
        console.log("MongoDB connection error:", error)
    );

// Test Route
app.get("/", (req, res) => {
    res.send("Textile Website Backend is Running!");
});

// Save Enquiry
app.post("/api/enquiries", async (req, res) => {
    try {
        const enquiry = new Enquiry({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            message: req.body.message,
        });

        await enquiry.save();

        res.status(201).json({
            message: "Enquiry sent successfully!",
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to send enquiry",
        });
    }
});
// Get all enquiries
app.get("/api/enquiries", async (req, res) => {
    try {
        const enquiries = await Enquiry.find().sort({ createdAt: -1 });

        res.status(200).json(enquiries);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to fetch enquiries",
        });
    }
});
// Mark enquiry as contacted
app.put("/api/enquiries/:id/contacted", async (req, res) => {
    try {
        const enquiry = await Enquiry.findByIdAndUpdate(
            req.params.id,
            { contacted: true },
            { returnDocument: "after" }
        );

        res.status(200).json(enquiry);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to update enquiry",
        });
    }
});


// Delete enquiry
app.delete("/api/enquiries/:id", async (req, res) => {
    try {
        await Enquiry.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: "Enquiry deleted successfully",
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to delete enquiry",
        });
    }
});

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});