var express = require("express");
var router = express.Router();
const {
  category_list_get,
  category_create_get,
  category_create_post,
  category_one_get,
  category_edit_get,
  category_edit_post,
} = require("../controllers/categoryController");

/* GET users listing. */
router.get("/", category_list_get);

//create
router.get("/create", category_create_get);

//post create
router.post("/create", category_create_post);

//show all from single category
router.get("/:id", category_one_get);

//edit form
router.get("/:id/edit", category_edit_get);

//post edit form
router.put("/:id/edit", category_edit_post);

module.exports = router;
