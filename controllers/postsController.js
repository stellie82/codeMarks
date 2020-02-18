const db = require("../models");

module.exports = {
  findAll: function(req, res) {
    db.Post
      .find(req.query)
      .populate('author')
      .populate('tags')
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.Post
      .findById(req.params.id)
      .populate('author')
      .populate('tags')
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.Post
      .create(req.body)
      .then(dbModel => {
        console.log(dbModel);
        res.json(dbModel);
      })
      .catch(err => {
        console.log(err);
        res.status(422).json(err);
      });
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
  },

  //find top posts in past 10 days
  popularPosts: function(req, res) {
    if (req.body.tagFilters) {
      //  db.Post.find(req.query)
      db.Post
        .find({ tags: { $all: req.body.tagfilters } })
        .populate('author')
        .populate('tags')
        .sort({ voteCount: -1 })
        .limit(20)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    } else {
      db.Post
        .find(req.query)
        .populate('author')
        .populate('tags')
        .sort({ voteCount: -1 })
        .limit(20)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    }
  },
  //recent posts
  recentPosts: function(req, res) {
    if (req.body.tagFilters) {
      //  db.Post.find(req.query)
      startDate = new Date(); // Current date
      startDate.setDate(startDate.getDate() - 10);
      db.Post
        .find({ created_date: { $gte: startDate } })
        .populate('author')
        .populate('tags')
        .sort({ date: -1 })
        .limit(20)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    } else {
      db.Post
        .find(req.query)
        .populate('author')
        .populate('tags')
        .sort({ date: -1 })
        .limit(20)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    }
  },

  myPosts: function(req, res) {
    if (req.body.tagFilters) {
      db.Post.find({ author: req.user.id }, req.body)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    } else {
      db.Post.find({ author: req.user.id }, req.body)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    }
  }
};
