const express = require('express');
const router = express.Router();
const Workout = require('../models/workout');
const isAuthenticated = require('../middleware/isAuthenticated'); // Ensure you have this middleware

router.get('/search', isAuthenticated, async (req, res) => {
  try {
    const workouts = await Workout.find({
      $text: { $search: req.query.query },
      // user: req.user.id // Uncomment if you want to limit search to the logged-in user's workouts
    });
    res.render('workouts', { workouts });
  } catch (err) {
    console.error(err);
    res.render('error', { error: err });
  }
});

module.exports = router;
