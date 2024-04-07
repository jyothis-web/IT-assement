// controllers/itemController.js

const Item = require('../models/items');

const getAllItems = async (req, res) => {
  try {
    // Find all items
    const items = await Item.find();
    
    res.status(200).json({
      success: true,
      data: items,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error in fetching items",
      error: error.message,
    });
  }
};

module.exports = {
  getAllItems
};
