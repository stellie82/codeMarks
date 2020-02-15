const router = require("express").Router();
const tagsController = require("../../controllers/tagsController");

// Matches with "/api/tags"
router
  .route("/")
  // find all tags
  .get(tagsController.findAll)
  // list popular tags
  .get(tagsController.popularTags);

// Matches with "/api/tags/:id"
router
  .route("/:id")
  // find tag by ID
  .get(tagsController.findById)
  // update tag
  .put(tagsController.update)
  // delete tag
  .delete(tagsController.remove);

module.exports = router;
