const Category = require("../models/category");
const Product = require("../models/product");

//get list
exports.category_list_get = async (req, res, next) => {
  let categories = await Category.find();
  res.render("categories", { title: "All Categories", categories });
};

//create
exports.category_create_get = (req, res, next) => {
  res.render("category_form_new", { title: "Create new Category" });
};

//post create
exports.category_create_post = async (req, res, next) => {
  const { name, desc } = req.body;
  const category = new Category({ name, desc });
  await category.save();
  res.redirect(`/category/${category.id}`);
};

//show all items in one category
exports.category_one_get = async (req, res, next) => {
  const { id } = req.params;
  const category = await Category.findById(id);
  const products = await Product.find({ category });
  res.render("category", { category, products });
};

exports.category_edit_get = async (req, res, next) => {
  const { id } = req.params;
  const category = await Category.findById(id);
  res.render("Category_form_edit", { category });
};

exports.category_edit_post = async (req, res, next) => {
  const { id } = req.params;
  const { name, desc } = req.body;
  const newDetails = { name, desc };
  await Category.findByIdAndUpdate(id, newDetails);
  res.redirect(`/category/${id}`);
};
