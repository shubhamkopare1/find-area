const Area = require('../models/area');

exports.searchArea = async (req, res) => {
  try {
    let { areaName } = req.params;
    areaName = areaName.toUpperCase();


    // Find the area by its name (Locality Search)
    let area = await Area.findOne({ areaName });

    
    if (!area) {
      
      area = await Area.findOne({ neighbouringAreas: { $in: [areaName] } });

      if (!area) {
        return res.status(404).json({ message: 'Area or Neighbor not found.' });
      }
    }

   
    console.log('Neighboring areas:', area.neighbouringAreas);

    
    const neighbors = await Area.find({
        neighbouringAreas: { $in: area.neighbouringAreas }
      });
  
        res.json({
            area: {
              areaName: area.areaName,
              crossCheckArea: area.crossCheckArea,
              status: area.crossCheckAreaStatus,
              crossCheckNames: area.crossCheckNamesOfArea,
              responsibility: area.responsibility,
            },
            neighbors: [...area.neighbouringAreas]
          });
    
  } catch (error) {
    console.error('Error handling search:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};
