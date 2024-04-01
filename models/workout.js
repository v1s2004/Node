const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  intensity: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
});

const Workout = mongoose.model('Workout', workoutSchema);

module.exports = Workout;
