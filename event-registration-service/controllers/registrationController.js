const Registration = require("../models/registration.js");
const { getUserById } = require("../services/userService.js");
const { getEventById, updateEvent } = require("../services/eventService.js");
const { sendRegistrationSuccess } = require("../services/notificationService.js")

// Register a user for an event
const registerUser = async (req, res) => {
  const { userId, eventId } = req.body;

  try {
    // 1. Check user exists
    const user = await getUserById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 2. Check user verified
    if (!user.is_verified) {
      return res.status(403).json({ message: "User not verified" });
    }

    // 3. Check event exists
    const event = await getEventById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // 4. Check registration date window
    const now = new Date();

    if (now < new Date(event.startRegistrationDate)) {
      return res.status(400).json({ message: "Registration has not started yet" });
    }

    if (now > new Date(event.endRegistrationDate)) {
      return res.status(400).json({ message: "Registration period is over" });
    }

    // 5. Check capacity
    if (event.currentParticipants >= event.maxParticipants) {
      return res.status(400).json({ message: "Event is full" });
    }

    // 6. Check already registered
    const alreadyRegistered = await Registration.findOne({ where: { userId, eventId } });
    if (alreadyRegistered) {
      return res.status(400).json({ message: "User already registered for this event" });
    }

    // 7. INCREASE the participant count BEFORE sending to event service
    const updatedEventPayload = {
      ...event,
      currentParticipants: event.currentParticipants + 1
    };

    // 8. Update event in event-service
    const updatedEvent = await updateEvent(updatedEventPayload);

    if (!updatedEvent) {
      return res.status(500).json({ message: "Failed to update event participant count" });
    }

    // 9. Create registration in local DB
    const registration = await Registration.create({ userId, eventId });

    sendRegistrationSuccess(user, event);

    return res.status(201).json({
      message: "Registration successful",
      registration
    });

  } catch (error) {
    console.error("Error during registration:", error);
    return res.status(500).json({ message: "Error processing registration" });
  }
};


// Get all registrations
const getAllRegistrations = async (req, res) => {
  try {
    const regs = await Registration.findAll();
    res.json(regs);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// check registration exists having eventId and userId
const checkRegistration = async (req, res) => {
  const { eventId, userId } = req.query;

  if (!eventId || !userId) {
    return res.status(400).json({ message: "eventId and userId are required" });
  }

  try {
    const record = await Registration.findOne({
      where: { eventId, userId }
    });

    return res.status(200).json({
      exists: !!record,  // true if found, false if not
      record
    });

  } catch (error) {
    console.error("Error checking registration:", error.message);
    return res.status(500).json({
      message: "Internal server error"
    });
  }
};


// Get registrations by user
const getRegistrationsByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const regs = await Registration.findAll({ where: { userId } });
    res.json(regs);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete a registration
const deleteRegistration = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the registration
    const registration = await Registration.findByPk(id);
    if (!registration) {
      return res.status(404).json({ message: "Registration not found" });
    }

    const { eventId } = registration;

    // Try to get event (optional if microservices separated)
    const event = await getEventById(eventId);

    // Delete registration
    await Registration.destroy({ where: { id } });

    // Only update event count if it exists
    if (event && event.currentParticipants > 0) {
      event.currentParticipants = event.currentParticipants - 1;
      await updateEvent(event);
    }

    res.status(200).json({ message: "Registration deleted successfully" });
  } catch (error) {
    console.error("Error deleting registration:", error.message);
    res.status(500).json({ message: "Error deleting registration" });
  }
};

// Delete all registrations for a specific event
const deleteRegistrationsByEventId = async (req, res) => {
  try {
    const { eventId } = req.params;

    // Check if eventId provided
    if (!eventId) {
      return res.status(400).json({ message: 'Event ID is required' });
    }

    // Delete all registrations associated with this event
    const deletedCount = await Registration.destroy({
      where: { eventId: eventId },
    });

    res.status(200).json({
      message: `All ${deletedCount} registrations deleted successfully for event ${eventId}`,
    });
  } catch (error) {
    console.error('Error deleting registrations:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

module.exports = { registerUser, getAllRegistrations, getRegistrationsByUser, deleteRegistration, deleteRegistrationsByEventId, checkRegistration }
