
var mongoose = require('mongoose');
var ImageCardModel = require('./ImageCardModel');

// Define our schema
var GalleryCardModel   = new mongoose.Schema({
    imageCards:ImageCardModel[]
});

// Export the Mongoose model
module.exports = mongoose.model('GalleryCard', GalleryCardModel);