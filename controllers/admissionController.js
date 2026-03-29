const Admission = require("../models/Admission");
const Quota = require("../models/Quota");
const generate = require("../utils/generateAdmissionNumber");

exports.allocate = async (req, res) => {
  const { applicantId, programId, quotaId, allotmentNumber } = req.body;

  const exists = await Admission.findOne({ applicantId });
  if (exists) return res.status(400).json({ message: "Already allocated" });

  const quota = await Quota.findById(quotaId);
  if (quota.filledSeats >= quota.totalSeats) {
    return res.status(400).json({ message: "Quota Full" });
  }

  quota.filledSeats++;
  await quota.save();

  const admission = await Admission.create({
    applicantId,
    programId,
    quotaId,
    allotmentNumber,
    isLocked: true
  });

  res.json(admission);
};

exports.confirm = async (req, res) => {
  const admission = await Admission.findById(req.params.id)
    .populate("programId")
    .populate("quotaId");

  if (admission.feeStatus !== "Paid") {
    return res.status(400).json({ message: "Fee not paid" });
  }

  const count = await Admission.countDocuments({
    programId: admission.programId._id,
    quotaId: admission.quotaId._id,
    status: "Confirmed"
  });

  admission.admissionNumber = generate(
    admission.programId.code,
    admission.quotaId.quotaType,
    count + 1
  );

  admission.status = "Confirmed";
  await admission.save();

  res.json(admission);
};

exports.updateFee = async (req, res) => {
  const admission = await Admission.findById(req.params.id);
  admission.feeStatus = "Paid";
  await admission.save();
  res.json(admission);
};