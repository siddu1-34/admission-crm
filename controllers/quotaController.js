const Quota = require("../models/Quota");

exports.create = async (req, res) => {
  res.json(await Quota.create(req.body));
};

exports.getAll = async (req, res) => {
  const data = await Quota.find(req.query).populate({
    path: "programId",
    select: "name code -_id" // 👈 program name & code
  });

  res.json(data);
};