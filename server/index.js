// server/index.js
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Routes
const customerRoutes = require('./routes/customers');
const addressRoutes = require('./routes/addresses');

app.use('/api/customers', customerRoutes);
app.use('/api', addressRoutes);          


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on ${PORT}`);
});
