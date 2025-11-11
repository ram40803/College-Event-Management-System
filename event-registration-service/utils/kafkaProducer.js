const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'event-registration-service',
  brokers: [process.env.KAFKA_BROKER],
});

const producer = kafka.producer();

async function initKafkaProducer() {
  await producer.connect();
  console.log('✅ Kafka Producer connected');
}

async function sendNotification(email, subject, message) {
  try {
    data = {
        "email": email,
        "subject": subject,
        "message": message
    }

    await producer.send({
      topic: process.env.KAFKA_TOPIC,
      messages: [{ value: JSON.stringify(data) }],
    });
    console.log(`📤 Notification sent: ${JSON.stringify(data)}`);
  } catch (error) {
    console.error('❌ Error sending Kafka message:', error);
  }
}

module.exports = { initKafkaProducer, sendNotification };
