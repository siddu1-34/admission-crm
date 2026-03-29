const Campus = require("../models/Campus");

exports.create = async (req, res) => {
  res.json(await Campus.create(req.body));
};

exports.getAll = async (req, res) => {
  res.json(await Campus.find());
};