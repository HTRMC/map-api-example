const axios = require('axios');
const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'public')));

// API call to Nominatim (OpenStreetMap)
app.get('/location', async (req, res) => {
  try {
    const response = await axios.get('https://nominatim.openstreetmap.org/search', {
      params: {
        q: 'Roermond',
        format: 'json'
      }
    });

    const data = response.data[0];
    const { lat, lon } = data;

    res.json({ lat, lon });
  } catch (error) {
    res.status(500).send('Error fetching location data');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
