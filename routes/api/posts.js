const router = require("express").Router();
const postsController = require("../../controllers/postsController");

// Matches with "/api/posts"
router
  .route("/")
  //find all posts
  .get(postsController.findAll)
  //create a new post
  .post(postsController.create);

// Matches with "/api/posts/:id"
router
  .route("/:id")
  //find post by ID
  .get(postsController.findById)
  //update post
  .put(postsController.update)
  //delete post
  .delete(postsController.remove);

module.exports = router;
