import express from "express";
import cors from "cors";
import notificationRoutes from "./routes/notificationRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("📩 Notification Service Running...");
});

app.use("/api/notifications", notificationRoutes);

export default app;
