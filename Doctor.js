const mongoose = require("mongoose");
const express  = require('express')
const router = express.Router();

const doctorSchema = new mongoose.Schema({
  name: String,
  specialization: String,
  experience: Number,
  qualifications: [String],
  fees: Number,
  cashback: Number,
  languagesSpoken: [String],
  location: {
    city: String,
    state: String,
  },
  availability: {
    online: Boolean,
    hospitalVisit: Boolean,
    nextAvailableInMinutes: Number,
  },
  profileImage: String,
  clinicName: String,
  rating: Number,
  totalReviews: Number,
});

const Doctor = mongoose.model("Doctor", doctorSchema);

router.get('/all', async (req, res) => {
    try {
      const doctors = await Doctor.find();
      res.json(doctors);
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch doctors" });
    }
  });

router.post('/adddoctor', async (req, res) => {
    try {
      const doctor = new Doctor(req.body);
      const savedDoctor = await doctor.save();
      res.status(201).json(savedDoctor);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
});

router.get('/filter' , async (req, res) => {
    try {
      const {
        specialization,
        minExperience,
        maxFees,
        language,
        page = 1,
        limit = 10
      } = req.query;
  
      const filter = {};
  
      if (specialization) filter.specialization = specialization;
      if (minExperience) filter.experience = { $gte: Number(minExperience) };
      if (maxFees) filter.fees = { $lte: Number(maxFees) };
      if (language) filter.languagesSpoken = { $in: [language] };
  
      const doctors = await Doctor.find(filter)
        .skip((page - 1) * limit)
        .limit(Number(limit));
  
      const total = await Doctor.countDocuments(filter);
  
      res.json({
        data: doctors,
        currentPage: Number(page),
        totalPages: Math.ceil(total / limit),
        total
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

module.exports = router;