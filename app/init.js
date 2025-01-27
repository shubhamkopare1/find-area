// init.js
const mongoose = require('mongoose');
const Area = require('./models/area');  // Import the area model

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/localityDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
    insertSampleData();
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });

// Function to insert sample data
async function insertSampleData() {
  // Sample area data
  const sampleArea = new Area({
    areaName: 'AASHIANA',
    crossCheckArea: 'Area',
    crossCheckAreaStatus: 'Done',
    crossCheckNamesOfArea: ['AASHIANA'],
    neighbouringAreas: [
      'LDA COLONY', 'BANGLA BAZAR', 'SHARDA COLONY', 'RATAN KHAND', 
      'SOUTH CITY', 'ALAMBAGH', 'TELIBAGH', 'VRINDAVAN YOJNA'
    ],
    namesOfLocalities: ['AASHIANA'],
    responsibility: ['Isha Piwal', 'Mohammad Samdani Qureshi']
  });

  // Save the sample data to MongoDB
  try {
    const savedArea = await sampleArea.save();
    console.log('Sample data inserted:', savedArea);
    mongoose.disconnect(); // Disconnect after data is inserted
  } catch (error) {
    console.error('Error inserting data:', error);
    mongoose.disconnect();
  }
}
