const express = require('express');
const app = express();
const teams = require('./api/teams')
const players = require('./api/players')

app.use(express.json({ extended: false }));

app.use(teams)

app.use(players);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server is running in port ${PORT}`));