const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var CanalSchema = Schema({
  nombre: {
    type: String,
    required: true,
    unique: true
  },
  propietario: String,
  subscriptores: {
    type: Number,
    default: 0
  }
}, {
  timestamps:{
    default: Date.now
  }
});

module.exports = mongoose.model("Canal", CanalSchema);
