var mongoose = require('mongoose');
  var Schema = mongoose.Schema;

  var Banquets = new Schema({
    name:  String,
    about: String,
    services:   String,
    email:   String,
    department : String


  });

  module.exports = mongoose.model('banquets',Banquets);