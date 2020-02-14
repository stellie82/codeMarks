const router = require("express").Router();
const postRoutes = require("./posts");
const tagRoutes = require("./tags");

// Post routes
router.use("/posts", postRoutes);
router.use("/tags", tagRoutes);

module.exports = router;
