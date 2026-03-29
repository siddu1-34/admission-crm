const Institution = require("../models/Institution");

exports.create = async (req, res) => {
  const data = await Institution.create(req.body);
  res.json(data);
};

exports.getAll = async (req, res) => {
  res.json(await Institution.find());
};