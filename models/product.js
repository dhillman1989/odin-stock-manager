var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ProductSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  desc: { type: String, required: true },
  image: { type: String, required: true },
  category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
});

// Virtual for author's URL
ProductSchema.virtual("url").get(function () {
  return "/product/" + this._id;
});

//Export model
module.exports = mongoose.model("Product", ProductSchema);
