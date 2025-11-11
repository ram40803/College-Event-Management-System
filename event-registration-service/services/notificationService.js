// utils/notification_service.js
const { sendNotification } = require('../utils/kafkaProducer');

async function sendRegistrationSuccess(user, event) {
  const subject = `🎉 You're Registered for ${event.name}!`;

  const message = `
Hi ${user.name},

✅ Great news! Your registration for the event **"${event.name}"** was successful.

📅 **Date:** ${event.date}  
📍 **Location:** ${event.location}

We're thrilled to have you join us. Please arrive 10–15 minutes early and bring a valid ID for check-in.

If you have any questions, feel free to reach out to our support team.

See you at the event!  
— The Event Management Team
`;

  await sendNotification(user.email, subject, message);
}

async function sendRegistrationCancelled(user, event, reason) {
  const subject = `⚠️ Your Registration for ${event.name} Has Been Cancelled`;

  const message = `
Hi ${user.name},

We’re sorry to inform you that your registration for **"${event.name}"** has been cancelled.  
${reason ? `📝 **Reason:** ${reason}` : ''}

If this was not intentional or you’d like to rejoin, please visit our website and register again.

We hope to see you at future events.  
— The Event Management Team
`;

  await sendNotification(user.email, subject, message);
}

async function sendEventReminder(user, event) {
  const subject = `⏰ Reminder: ${event.name} is Coming Soon!`;

  const message = `
Hello ${user.name},

Just a friendly reminder that **"${event.name}"** is happening soon!

📅 **Date:** ${event.date}  
📍 **Location:** ${event.location}

We’re excited to see you there. Don’t forget to bring your registration confirmation if required.

Have a great time!  
— The Event Management Team
`;

  await sendNotification(user.email, subject, message, {
    type: 'EVENT_REMINDER',
    userId: user.id,
    eventId: event.id,
  });
}

module.exports = {
  sendRegistrationSuccess,
  sendRegistrationCancelled,
  sendEventReminder,
  sendEventUpdate,
};
