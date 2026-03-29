const Admission = require("../models/Admission");
const Quota = require("../models/Quota");
const Applicant = require("../models/Applicant");

exports.get = async (req, res) => {
  try {
    const totalAdmissions = await Admission.countDocuments({
      status: "Confirmed"
    });

    const quotaStats = await Quota.find();

    const pendingDocs = await Applicant.countDocuments({
      documentsStatus: { $ne: "Verified" }
    });

    const feePending = await Admission.countDocuments({
      feeStatus: "Pending"
    });

    res.json({
      totalAdmissions,
      quotaStats,
      pendingDocs,
      feePending
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};