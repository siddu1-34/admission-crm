const Quota = require("../models/Quota");

exports.create = async (req, res) => {
  res.json(await Quota.create(req.body));
};

exports.getAll = async (req, res) => {
  res.json(await Quota.find(req.query));
};