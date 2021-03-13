const async = require("async");
const path = require("path");

//login check middleware
const isLoggedIn = require("../middleware/isLoggedIn");

//multer setup
var multer = require("multer");
var storage = multer.diskStorage({
  destination: "./public/images",
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).single("image");

const Category = require("../models/category");
const Product = require("../models/product");

checkFileType = (file, cb) => {
  //allow extensions
  const filetypes = /jpg|jpeg|png|gif|svg/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("error: invalid filetype");
  }
};

//show all
exports.product_list_get = async (req, res, next) => {
  const products = await Product.find();
  res.render("products", { title: "All Products", products });
};

//create
exports.product_create_get = async (req, res, next) => {
  const categories = await Category.find();
  res.render("product_form_new", { title: "Create new Product", categories });
};

//post create
exports.product_create_post = async (req, res, next) => {
  upload(req, res, (err) => {
    const { name, desc, price, quantity, category } = req.body;
    console.log(req.body.name, req.file);
    if (err) {
      console.log(err);
      Category.find().then((categories) =>
        res.render("product_form_new", {
          title: "Error creating Product",
          product: req.body,
          categories,
          err,
        })
      );
    } else if (
      name == "" ||
      desc == "" ||
      price == "" ||
      quantity == "" ||
      !req.file
    ) {
      Category.find().then((categories) =>
        res.render("product_form_new", {
          title: "Error creating Product",
          product: req.body,
          categories,
          err: "Please fill in all fields",
        })
      );
    } else {
      const product = new Product({
        name,
        desc,
        price,
        image: "/images/" + req.file.filename,
        quantity,
        category,
      });
      product.save().then(res.redirect(`/product/${product.id}`));
    }
  });
};

// show one item
exports.product_one_get = async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findById(id);

  res.render("product", { product, isLoggedIn: req.app.locals.username });
};

exports.product_one_delete = async (req, res, next) => {
  const { id } = req.params;
  await Product.findByIdAndDelete(id);
  res.redirect("/product");
};

exports.product_edit_get = async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  const categories = await Category.find();
  res.render("product_form_edit", {
    product,
    categories,
  });
};

exports.product_edit_post = async (req, res, next) => {
  const { id } = req.params;
  const { name, desc, price, quantity, category } = req.body;
  const newDetails = { name, desc, price, quantity, category };
  await Product.findByIdAndUpdate(id, newDetails);
  res.redirect(`/product/${id}`);
};
