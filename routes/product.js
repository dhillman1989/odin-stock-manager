var express = require("express");
var router = express.Router();
var multer = require("multer");
var upload = multer({ dest: "public/images/" });

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

//controllers
const {
  product_create_get,
  product_create_post,
  product_one_get,
  product_list_get,
  product_one_delete,
  product_edit_get,
  product_edit_post,
} = require("../controllers/productController");

//middlewares
const isLoggedIn = require("../middleware/isLoggedIn");

//show all
router.get("/", product_list_get);

//create
router.get("/create", product_create_get);

//post create
router.post("/create", product_create_post);

//show all from single product
router.get("/:id", product_one_get);

//edit form
router.get("/:id/edit", isLoggedIn, product_edit_get);

//post edit form
router.put("/:id/edit", isLoggedIn, product_edit_post);

//delete product by id
router.delete("/:id", isLoggedIn, product_one_delete);

module.exports = router;
