const mongoose = require("mongoose");
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

router.post('/adddoctor', async (req, res) => {
    try {
      const doctor = new Doctor(req.body);
      const savedDoctor = await doctor.save();
      res.status(201).json(savedDoctor);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
});


module.exports = router;