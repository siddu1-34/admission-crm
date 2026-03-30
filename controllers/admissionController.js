const Admission = require("../models/Admission");
const Quota = require("../models/Quota");
const generate = require("../utils/generateAdmissionNumber");

// 🚀 Allocate
exports.allocate = async (req, res) => {
  try {
    const { applicantId, programId, quotaId, allotmentNumber } = req.body;

    // ❌ prevent duplicate
    const exists = await Admission.findOne({ applicantId });
    if (exists) {
      return res.status(400).json({ message: "Already allocated" });
    }

    const quota = await Quota.findById(quotaId);

    if (quota.filledSeats >= quota.totalSeats) {
      return res.status(400).json({ message: "Quota Full" });
    }

    // ✅ atomic update
    await Quota.findByIdAndUpdate(quotaId, {
      $inc: { filledSeats: 1 }
    });

    const admission = await Admission.create({
      applicantId,
      programId,
      quotaId,
      allotmentNumber,
      status: "Allocated",   // ✅ important
      feeStatus: "Pending"
    });

    res.json(admission);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Confirm
exports.confirm = async (req, res) => {
  try {
    const admission = await Admission.findById(req.params.id)
      .populate("programId")
      .populate("quotaId");

    if (!admission) {
      return res.status(404).json({ message: "Not found" });
    }

    // 🚨 fee check
    if (admission.feeStatus !== "Paid") {
      return res.status(400).json({ message: "Fee not paid" });
    }

    // 🚨 prevent double confirm
    if (admission.status === "Confirmed") {
      return res.status(400).json({ message: "Already confirmed" });
    }

    // 🔥 generate admission number
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

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 💰 Fee update
exports.updateFee = async (req, res) => {
  try {
    const admission = await Admission.findById(req.params.id);

    if (!admission) {
      return res.status(404).json({ message: "Not found" });
    }

    admission.feeStatus = "Paid";
    await admission.save();

    res.json(admission);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.getAll = async (req, res) => {
  const data = await Admission.find()
    .populate("applicantId", "firstName lastName")
    .populate("programId", "name")
    .populate("quotaId", "quotaType");

  res.json(data);
};