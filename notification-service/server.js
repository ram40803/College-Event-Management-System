const express = require('express');
const { runConsumer } = require('./kafka/consumer');
require("./utils/eurekaClient.js");

const app = express();
const PORT = 8084;

app.get('/', (req, res) => {
  res.send('📬 Notification Service with Kafka is running!');
});

// Start Kafka consumer
runConsumer().catch(console.error);

app.listen(PORT, () => {
  console.log(`🚀 Notification Service running on port ${PORT}`);
});
