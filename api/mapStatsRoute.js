const express = require('express');
const HLTV = require('hltv').default;

const router = express.Router();

router.get('/api/mapstats', async (req, res, next) => {
    try {
        //const teamstats = await HLTV.getMatchMapStats({ id: 154238 });
        //const teamstats = await HLTV.getMatchStats({ id: 62979, });
        const teamstats = await HLTV.getMatch({ id: 2362228 });
        next();
        res.json(teamstats)
    } catch (err) {
        console.log(err);
        res.status(500).json({
          message: 'Не удалось получить данные',
        });
    }
  });

module.exports = {
    mapStatsRoute: router,
};
