const mongoose = require('mongoose');

const areaSchema = new mongoose.Schema({
  areaName: { type: String, required: true },
  crossCheckArea: { type: String, required: true },
  crossCheckAreaStatus: { type: String, required: true },
  crossCheckNamesOfArea: [String],
  neighbouringAreas: [String],
  namesOfLocalities: [String],
  responsibility: [String],
});

const Area = mongoose.model('Area', areaSchema);
module.exports = Area;
