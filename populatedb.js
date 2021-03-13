console.log(
  "This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0.a9azn.mongodb.net/local_library?retryWrites=true"
);

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
  if (!userArgs[0].startsWith('mongodb')) {
      console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
      return
  }
  */
var async = require("async");
var Category = require("./models/category");
var Product = require("./models/product");

var mongoose = require("mongoose");
var mongoDB =
  "mongodb+srv://mdnlessonuser:CEHDKXF9kFUfAUuF@cluster0.qzgj7.mongodb.net/odin-shop-stock?retryWrites=true&w=majority";
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

var categories = [];
var products = [];

const clearAll = async () => {
  await Product.deleteMany({});
  await Category.deleteMany({});
};

function categoryCreate(name, desc, cb) {
  categorydetail = { name, desc };

  var category = new Category(categorydetail);

  category.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("Category: " + category);
    categories.push(category);
    cb(null, category);
  });
}

function productCreate(name, desc, price, quantity, image, category, cb) {
  var product = new Product({ name, desc, price, quantity, category, image });

  product.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New product: " + product);
    products.push(product);
    cb(null, product);
  });
}

function createCategoriesProducts(cb) {
  async.series(
    [
      function (callback) {
        categoryCreate("Vegetables", "Fresh Daily", callback);
      },
      function (callback) {
        categoryCreate("fruit", "Fresh daily", callback);
      },
      function (callback) {
        categoryCreate("Frozen", "Frozen foods off all varieties", callback);
      },
      function (callback) {
        productCreate(
          "Potatoes",
          "1kg bag of potatoes",
          6.0,
          200,
          "/images/potatoes.jpeg",
          categories[0],
          callback
        );
      },
      function (callback) {
        productCreate(
          "Potatoes large",
          "Extra Large Baking Potatoes",
          4.0,
          200,
          "/images/potatoes.jpeg",
          categories[0],
          callback
        );
      },
      function (callback) {
        productCreate(
          "Frozen Chicken",
          "Frozen Chicken",
          5.5,
          250,
          "/images/chicken.jpeg",
          categories[2],
          callback
        );
      },
    ],
    // optional callback
    cb
  );
}

async.series(
  [clearAll, createCategoriesProducts],
  // Optional callback
  function (err, results) {
    if (err) {
      console.log("FINAL ERR: " + err);
    } else {
      console.log("population complete");
    }
    // All done, disconnect from database
    mongoose.connection.close();
  }
);
