const Applicant = require("../models/Applicant");

exports.create = async (req, res) => {
  res.json(await Applicant.create(req.body));
};

exports.getAll = async (req, res) => {
  res.json(await Applicant.find());
};