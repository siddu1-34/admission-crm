const Department = require("../models/Department");

exports.create = async (req, res) => {
  res.json(await Department.create(req.body));
};

exports.getAll = async (req, res) => {
  res.json(await Department.find());
};