const mongoose = require('mongoose');

const budgetSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  budget: {
    type: Number,
    required: true
  },
  color: {
    type: String,
    required: true,
    match: /^#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{8})$/ //to include alpha values as well for RGBA
  },
  borderColor: {
    type: String,
    required: true,
    match: /^#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{8})$/
  }
});

const Budget = mongoose.model('Budget', budgetSchema);

module.exports = Budget;
