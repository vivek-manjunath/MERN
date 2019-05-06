const router = require('express').Router();
const teamRoutes = require('./team');
const playerRoutes = require('./player');
const tournamentRoutes = require('./tournament');
const matchRoutes = require('./match');
const scorecardRoutes = require('./scorecard');

router.use('/api/teams', teamRoutes);
router.use('/api/players', playerRoutes);
router.use('/api/tournaments', tournamentRoutes);
router.use('/api/matches', matchRoutes);
router.use('/api/scorecards', scorecardRoutes);

module.exports = router;