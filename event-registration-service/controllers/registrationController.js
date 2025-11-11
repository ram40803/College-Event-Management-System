const Registration = require("../models/registration.js");
const { getUserById } = require("../services/userService.js");
const { getEventById, updateEvent } = require("../services/eventService.js");
const { sendRegistrationSuccess } = require("../services/notificationService.js")

// Register a user for an event
const registerUser = async (req, res) => {
  const { userId, eventId } = req.body;

  try {
    //Check if user exists
    const user = await getUserById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    //Check if user varify
    if(!user.is_verified){
      return res.status(403).json({ message: "User not varify"})
    }

    //Check if event exists
    const event = await getEventById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    //Check event status
    if (event.status.toLowerCase() !== 'open') {
      return res.status(400).json({ message: "Event registration is closed" });
    }

    //Check if event is full
    if (event.currentParticipants >= event.maxParticipants) {
      return res.status(400).json({ message: "Event is full" });
    }

    //Check if user already registered
    const alreadyRegistered = await Registration.findOne({ where: { userId, eventId } });
    if (alreadyRegistered) {
      return res.status(400).json({ message: "User already registered for this event" });
    }

    // Update event participant count (via Event Service)
    const updatedEvent = await updateEvent(event); // <-- must await this
    if (!updatedEvent) {
      return res.status(500).json({ message: "Failed to update event participant count" });
    }

    // Only if update successful, then create registration
    const registration = await Registration.create({ userId, eventId });

    sendRegistrationSuccess(user, event);
    res.status(201).json({
      message: "Registration successful",
      registration
    });

  } catch (error) {
    console.error("Error during registration:", error.message);
    res.status(500).json({ message: "Error processing registration" });
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

module.exports = { registerUser, getAllRegistrations, getRegistrationsByUser, deleteRegistration, deleteRegistrationsByEventId }
