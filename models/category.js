var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var CategorySchema = new Schema({
  name: String,
  desc: String,
  URL: String,
});

// Virtual for category URL
CategorySchema.virtual("url").get(function () {
  return "/category/" + this._id;
});

//Export model
module.exports = mongoose.model("Category", CategorySchema);
