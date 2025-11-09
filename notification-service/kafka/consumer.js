const kafka = require('../config/kafkaConfig');
const { sendNotification } = require('../services/notificationService');

const consumer = kafka.consumer({ groupId: 'notification-group' });

const runConsumer = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: process.env.KAFKA_TOPIC, fromBeginning: true });

  console.log(`✅ Listening for messages on topic: ${process.env.KAFKA_TOPIC}`);

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const value = JSON.parse(message.value.toString());
      console.log('📩 Received message:', value);

      // Send notification
      await sendNotification(value);
    },
  });
};

module.exports = { runConsumer };
