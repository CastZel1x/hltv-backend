const express = require('express');
const HLTV = require("hltv").default;

const router = express.Router();

router.param('playerName', async (req, res, next, playerName) => {
  try {
    next();
  } catch {
    res.status(404).send('Player not found');
  }
});

router.get('/api/players/:playerName', async (req, res) => {
  const playerName = req.params.playerName;
  const player = await HLTV.getPlayerByName({ name: playerName });
  res.json(player);
});

const playerProperties = ['achievements', 'age', 'country', 'id', 'ign', 'image', 'instagram', 'name', 'news', 'statistics', 'team', 'teams', 'twitter'];
playerProperties.forEach(property => {
  router.get(`/api/players/:playerName/${property}`, async (req, res) => {
    const playerName = req.params.playerName;
    try {
        const player = await HLTV.getPlayerByName({ name: playerName });
        res.json(player[property]);
      } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while getting player data');
    }  
  });
});

module.exports = router;
