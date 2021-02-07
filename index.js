require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT;


app.use(bodyParser.json({ type: 'application/json' }));
app.use(morgan('combined'));
app.use(cors());

const api = require('./routes/api');

app.use('/api', api);

app.all('*', (req, res) => {
    res.sendStatus(404);
});


app.listen(PORT, function() {
    console.log(`Express was started on ${PORT} port`);
});
