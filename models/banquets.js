var mongoose = require('mongoose');
  var Schema = mongoose.Schema;

  var Banquets = new Schema({
    name:  String,
    about: String,
    services:   String,
    email:   String,
    phone : String,
    address : String,
    owner: String,
    username:String,
    password :String,
    reservations:String,
    applications:String,
    quantity:Number,


  });

  module.exports = mongoose.model('banquets',Banquets);