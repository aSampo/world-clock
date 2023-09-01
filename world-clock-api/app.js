const express = require('express');
const axios = require('axios');
const cors = require('cors')
const app = express();
app.use(cors())
const PORT = process.env.PORT || 3000;
const api = 'http://worldtimeapi.org/api/'

function formatTimeZoneResponse(data) {
  const dateParts = data.datetime.substring(0, 10).split('-');
  const formattedDate = `${dateParts[1]}/${dateParts[2]}/${dateParts[0]}`;
  const time = data.datetime.substring(11, 16);

  return {
    name: data.timezone,
    date: formattedDate,
    time,
  };
}

app.get('/timezone', async (req, res) => {
  try {
    const response = await axios.get(`${api}/timezone`);
    const timezones = response.data;
    res.json(timezones);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error!' });
  }
});


app.get('/timezone/:area/:location', async (req, res) => {
  const { area, location, region } = req.params;
  const api = 'http://worldtimeapi.org/api';
  const timezoneEndpoint = `${api}/timezone/${area}/${location}`;

  try {
    const response = await axios.get(timezoneEndpoint);

    res.json(formatTimeZoneResponse(response.data));

  } catch (error) {
    console.error(error);
    res.status(404).json({ error: 'Error!' });
  }
});


app.get('/timezone/:area/:location/:region', async (req, res) => {
  const { area, location, region } = req.params;
  const api = 'http://worldtimeapi.org/api';
  const timezoneEndpoint = `${api}/timezone/${area}/${location}/${region}`;

  try {
    const response = await axios.get(timezoneEndpoint);

    res.json(formatTimeZoneResponse(response.data));

  } catch (error) {
    console.error(error);
    res.status(404).json({ error: 'Error!' });
  }
});


app.listen(PORT, () => {
  console.log(`Running on ${PORT}`);
});
