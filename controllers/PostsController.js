const db = require("../models");

// Defining methods for the PostsController
module.exports = {
  //find all posts
  findAll: function(req, res) {
    db.Post.find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  //get post details
  findById: function(req, res) {
    db.Post.findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  //create post with associated github user id
  create: function(req, res) {
    db.Post.create({
      author: req.body.author,
      title: req.body.title,
      description: req.body.description,
      githubid: req.user.social.github.id
    })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    db.Post.findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Post.findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
