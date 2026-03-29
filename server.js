const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/institutions", require("./routes/institutionRoutes"));
app.use("/api/campuses", require("./routes/campusRoutes"));
app.use("/api/departments", require("./routes/departmentRoutes"));
app.use("/api/programs", require("./routes/programRoutes"));
app.use("/api/quotas", require("./routes/quotaRoutes"));
app.use("/api/applicants", require("./routes/applicantRoutes"));
app.use("/api/admissions", require("./routes/admissionRoutes"));
app.use("/api/dashboard", require("./routes/dashboardRoutes"));

app.listen(process.env.PORT, () =>
  console.log(`Server running on ${process.env.PORT}`)
);