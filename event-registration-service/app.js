const express = require("express");
const dotenv = require("dotenv");
const sequelize = require("./config/db.js");
const registrationRoutes = require("./routes/registrationRoutes.js");
const { initKafkaProducer } = require("./utils/kafkaProducer.js");
require("./utils/eurekaClient.js");

dotenv.config();

const app = express();
app.use(express.json());

(async () => {
  await initKafkaProducer();
})();

// Routes
app.use("/registrations", registrationRoutes);

// Sync database
sequelize
  .sync({ alter: true })
  .then(() => console.log("✅ MySQL connected and tables synced"))
  .catch((err) => console.error("❌ DB connection failed:", err));

app.get("/", (req, res) => {
  res.send("🎉 Registration Service is running!");
});

const PORT = process.env.PORT || 4002;
app.listen(PORT, () => console.log(`🚀 Registration Service on port ${PORT}`));
