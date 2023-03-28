const express = require('express');
const HLTV = require('hltv').default;
const cors = require('cors');

const app = express();

app.use(cors())

app.param('playerName', async (req, res, next, playerName) => {
  try {
    next();
  } catch {
    res.status(404).send('Player not found');
  }
});

app.get('/api/players/:playerName', async (req, res) => {
  const playerName = req.params.playerName;
  const player = await HLTV.getPlayerByName({ name: playerName });
  res.json(player);
});

const playerProperties = ['achievements', 'age', 'country', 'id', 'ign', 'image', 'instagram', 'name', 'news', 'statistics', 'team', 'teams', 'twitter'];
playerProperties.forEach(property => {
  app.get(`/api/players/:playerName/${property}`, async (req, res) => {
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

/*
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});*/

const port = 3001;
app.listen(port, function() {
  console.log('Server listening on port ' + port)
})
