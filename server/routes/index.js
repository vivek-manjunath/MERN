/** @format */

const router = require('express').Router();
const teamRoutes = require('./team');
const playerRoutes = require('./player');
const tournamentRoutes = require('./tournament');
const matchRoutes = require('./match');
const scorecardRoutes = require('./scorecard');
const battingScorecardRoutes = require('./battingScorecard');
const bowlingScorecardRoutes = require('./bowlingScorecard');
const userRoutes = require('./user');
const authRoutes = require('./auth');

router.use('/api/teams', teamRoutes);
router.use('/api/players', playerRoutes);
router.use('/api/tournaments', tournamentRoutes);
router.use('/api/matches', matchRoutes);
router.use('/api/scorecards', scorecardRoutes);
router.use('/api/battingScorecard', battingScorecardRoutes);
router.use('/api/bowlingScorecard', bowlingScorecardRoutes);
router.use('/api/user', userRoutes);
router.use('/api/auth', authRoutes);

module.exports = router;
