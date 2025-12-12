import dotenv from "dotenv";
dotenv.config();
import express from "express";
import bodyParser from "body-parser";
import webhookRoute from "./src/routes/webhook.js";
import { InventoryService } from "./src/services/inventory.js";
import { NotificationService } from "./src/services/notification.js";

const app = express();
app.use(bodyParser.json());
app.use("/", webhookRoute);

app.listen(process.env.PORT, async () => {
  await InventoryService.init();
  await NotificationService.init();
  console.log(`Server running on port ${process.env.PORT}`);
});
