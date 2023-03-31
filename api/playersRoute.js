const express = require('express');
const HLTV = require('hltv').default;

const router = express.Router();

router.param('playerName', async (req, res, next, playerName) => {
  try {
    const player = await HLTV.getPlayerByName({ name: playerName });
    req.player = player;
    next();
  } catch {
    res.status(404).send('Player not found');
  }
});

router.get('/api/players/:playerName', async (req, res) => {
  res.json(req.player);
});

const playerProperties = ['achievements', 'age', 'country', 'id', 'ign', 'image', 'instagram', 'name', 'news', 'statistics', 'team', 'teams', 'twitter'];
playerProperties.forEach(property => {
  router.get(`/api/players/:playerName/${property}`, async (req, res) => {
    res.json(req.player[property]);
  });
});

module.exports = {
  playersRoute: router,
};
