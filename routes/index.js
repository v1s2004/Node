const express = require('express');
const router = express.Router();
const Workout = require('../models/workout'); // Import Workout model

// GET home page
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Workout Tracker' }); // Render 'index.hbs' with the title
});

// GET workouts page
router.get('/workouts', async (req, res) => {
  try {
    const workouts = await Workout.find({}); // Fetch all workouts from your database
    res.render('workouts', { workouts }); // Render 'workouts.hbs' with workout data
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching workouts');
  }
});

module.exports = router;
