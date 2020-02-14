const db = require("../models");

// Defining methods for the PostsController
module.exports = {
  findAll: function(req, res) {
    db.Post.find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  //find top posts in past 10 days
  getPopularPosts: function(req, res) {
    if (req.body.tagFilters) {
      //  db.Post.find(req.query)
      db.Post.find({ tags: { $all: req.body.tagfilters } })
        .sort({ voteCount: -1 })
        .limit(20)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    } else {
      db.Post.find(req.query)
        .sort({ voteCount: -1 })
        .limit(20)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    }
  },

  //recent posts

  getRecentPosts: function(req, res) {
    if (req.body.tagFilters) {
      //  db.Post.find(req.query)
      startDate = new Date(); // Current date
      startDate.setDate(startDate.getDate() - 10);
      db.Post.find({ created_date: { $gte: startDate } })
        .sort({ voteCount: -1 })
        .limit(20)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    } else {
      db.Post.find(req.query)
        .sort({ voteCount: -1 })
        .limit(20)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    }
  },

  //my posts

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
      tags: req.body.tags
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
