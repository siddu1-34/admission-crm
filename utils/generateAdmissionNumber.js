module.exports = (programCode, quotaType, count) => {
  const num = String(count).padStart(4, "0");
  return `ABC/2026/UG/${programCode}/${quotaType}/${num}`;
};