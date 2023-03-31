const express = require('express');
const HLTV = require('hltv').default;

const router = express.Router();

router.param('teamName', async (req, res, next, teamName) => {
  try {
    const team = await HLTV.getTeamByName({ name: teamName });
    req.team = team;
    next();
  } catch {
    res.status(404).send('Team not found');
  }
});

router.get('/api/teams/:teamName', async (req, res) => {
  res.json(req.team);
});

const teamProperties = ['id', 'name', 'logo', 'country', 'rank', 'players', 'rankingDevelopment', 'news'];
teamProperties.forEach(property => {
  router.get(`/api/teams/:teamName/${property}`, async (req, res) => {
    res.json(req.team[property]);
  });
});

module.exports = {
  teamsRoute: router,
};