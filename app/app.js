const express = require('express');
const mongoose = require('mongoose');
const areaRoutes = require('./routes/areaRoutes'); // Importing routes
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors()); 
// MongoDB connection
mongoose.connect('mongodb://localhost:27017/localityDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Use area routes
app.use('/api', areaRoutes);

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
