const Program = require("../models/Program");

exports.create = async (req, res) => {
  res.json(await Program.create(req.body));
};

exports.getAll = async (req, res) => {
  res.json(await Program.find());
};