const Securities = require('../../models/securities');

exports.apiGet = (req, res) => {
  Securities.find({}, (error, docs) => {
    if (error) {
      console.log(error);
      res.end();
    } else {
      console.log(docs);
      res.send(docs);
    }
  });
};

exports.apiGetOne = (req, res) => {
  Securities.findOne({ _id: req.params.id }, (error, doc) => {
    if (error) {
      console.log(error);
      res.end();
    } else {
      console.log(doc);
      res.send(doc);
    }
  });
};

exports.apiPost = (req, res) => {
  const newSec = new Securities();
  newSec.name = req.body.name;
  newSec.type = req.body.type;
  newSec.startingPrice = req.body.startingPrice;
  newSec.save((error, doc) => {
    if (error) {
      console.log(error);
      res.end();
    } else {
      console.log(doc);
      res.end();
    }
  });
};

exports.apiUpdateNewPrice = (req, res) => {
  const newPrice = {};
  const date = new Date();
  newPrice.date = `${date.getFullYear()} ${date.getMonth()} ${date.getDate()}`;
  newPrice.price = req.body.price;
  Securities.findOneAndUpdate({ _id: req.params.id },
    { $push: { prices: newPrice } }, { upsert: true, new: true }, (err, doc) => {
      if (err) {
        console.log(err);
        res.end();
      } else {
        console.log(doc);
        res.end();
      }
    });
};
