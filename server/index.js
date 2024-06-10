const express = require('express');
const app = express();
const axios = require('axios');
const cors = require('cors');

const PORT = process.env.PORT || 5000;

app.use(cors());

// API endpoint to fetch Kanye West quotes
app.get('/api/quotes', async (req, res) => {
  try {
    let count = req.query.count || 5; // Default to 5 quotes or as per user input
    count = parseInt(count); // Convert count to integer

    // Fetch multiple quotes using Promise.all and Array.from
    const promises = Array.from({ length: count }, () => axios.get('https://api.kanye.rest/'));
    const responses = await Promise.all(promises);
    const quotes = responses.map(response => response.data);

    res.json(quotes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
