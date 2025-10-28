import dotenv from "dotenv";
import app from "./app.js";
import logger from "./config/logger.js";

dotenv.config();

const PORT = process.env.PORT || 5003;

app.listen(PORT, () => {
  logger.info(`🚀 Notification Service running on port ${PORT}`);
});
