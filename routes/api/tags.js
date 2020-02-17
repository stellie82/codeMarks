const router = require("express").Router();
const tagsController = require("../../controllers/tagsController");

//list all tags
router
  .route("/")
  // find all tags
  .get(tagsController.findAll);

//list popular tags
router.route("/popular").get(tagsController.popularTags);

router.route("/searchTag").get(tagsController.findAllByQuery);

//list tag by id
router
  .route("/:id")
  // find tag by ID
  .get(tagsController.findById)
  // update tag
  .put(tagsController.update)
  // delete tag
  .delete(tagsController.remove);

module.exports = router;
