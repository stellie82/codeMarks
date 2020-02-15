const router = require("express").Router();
const postsController = require("../../controllers/postsController");

// Matches with "/api/posts"
router
  .route("/")
  .get(postsController.findAll)
  .post(postsController.create);

// Matches with "/api/posts/:id"
router
  .route("/:id")
  .get(postsController.findById)
  .put(postsController.update)
  .delete(postsController.remove);

router.route("/popular").get(postsController.getPopularPosts);

router.route("/recent").get(postsController.getRecentPosts);

router.route("/myPosts").get(postsController.getMyPosts);

module.exports = router;
