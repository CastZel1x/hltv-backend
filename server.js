const express = require('express');
const cors =  require('cors');

const { mapStatsRoute } = require('./api/mapStatsRoute.js');
const { teamsRoute } = require('./api/teamsRoute.js');
const { playersRoute } = require('./api/playersRoute.js');


const app = express();
app.use(cors());
app.use(express.json({ extended: false }));


app.use(mapStatsRoute)
app.use(teamsRoute);
app.use(playersRoute);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server is running in port ${PORT}`));