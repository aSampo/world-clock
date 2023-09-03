const express = require('express');
const axios = require('axios');
const cors = require('cors')
const app = express();
app.use(cors())
const PORT = process.env.PORT || 3000;
const apiBaseUrl = 'http://worldtimeapi.org/api'

function formatTimeZoneResponse(data) {
  const { timezone, datetime } = data;
  const [date, time] = datetime.split('T');
  const formattedDate = date.split('-').reverse().join('/');
  return { name: timezone, date: formattedDate, time: time.substr(0, 5) };
}

app.get('/timezone', async (req, res) => {
  try {
    const response = await axios.get(`${api}/timezone`);
    const timezones = response.data;
    res.json(timezones);
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: 'Error!' });
  }
});


app.get('/timezone/:area/:location/:region?', async (req, res) => {
  const { area, location, region } = req.params;
  const timezoneEndpoint = `${apiBaseUrl}/timezone/${area}/${location}${region ? `/${region}` : ''}`;

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
