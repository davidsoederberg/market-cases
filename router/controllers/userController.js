const User = require('../../models/user');
const Securities = require('../../models/securities');

exports.apiGet = (req, res) => {
  User.find({}, (error, docs) => {
    if (error) {
      console.log(error);
      res.status(400).end();
    } else {
      console.log(docs);
      res.send(docs);
    }
  });
};

exports.apiGetOne = (req, res) => {
  User.findOne({ _id: req.params.id }, (error, doc) => {
    if (error) {
      console.log(error);
      res.status(400).end();
    } else {
      console.log(doc);
      res.send(doc);
    }
  });
};

exports.apiPost = (req, res) => {
  const newUser = new User();
  newUser.name = req.body.name;

  newUser.save((error, doc) => {
    if (error) {
      console.log(error);
      res.status(400).end();
    } else {
      console.log(doc);
      res.end();
    }
  });
};

exports.apiUpdateIndex = (req, res) => {
  User.findOneAndUpdate({ _id: req.params.id },
    { $set: { index: req.body.index } }, { upsert: true, new: true }, (error, doc) => {
      if (error) {
        console.log(error);
        res.end();
      } else {
        console.log(doc);
        res.end();
      }
    });
};

exports.apiUpdateCases = (req, res) => {
  Securities.findOne({ _id: req.body.case }, (error, sec) => {
    if (error) {
      console.log(error);
      res.end();
    } else {
      User.findOneAndUpdate({ _id: req.params.id },
        { $push: { cases: sec } }, { upsert: true, new: true }, (err, doc) => {
          if (err) {
            console.log(err);
            res.end();
          } else {
            console.log(doc);
            res.end();
          }
        });
    }
  });
};
