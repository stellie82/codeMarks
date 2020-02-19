const db = require("../models");

// Defining methods for the tagsController
module.exports = {
  // find all tags
  findAll: function(req, res) {
    db.Tag.find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  findAllByQuery: function(req, res) {
    console.log(req.body);
    db.Tag.find({ alias: { $all: req.body } })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  // list top 10 tags
  popularTags: function(req, res) {
    db.Tag.find(req.query)
      .sort({ popularity: -1 })
      .limit(20)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  // get tag details by ID
  findById: function(req, res) {
    db.Tag.findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  // update tag by ID
  update: function(req, res) {
    db.Tag.findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  // remove tag by ID
  remove: function(req, res) {
    db.Tag.findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
