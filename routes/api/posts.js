const router = require("express").Router();
const postsController = require("../../controllers/postsController");

// Matches with "/api/posts"
router
  .route("/")
  .get(postsController.findAll)
  .post(postsController.create);

router
  .route("/popular")
  .post(postsController.popularPosts);

router
  .route("/recent")
  .post(postsController.recentPosts);

router
  .route("/mine")
  .post(postsController.myPosts);

// Matches with "/api/posts/:id"
router
  .route("/:id")
  .get(postsController.findById)
  .put(postsController.update)
  .delete(postsController.remove);

module.exports = router;
