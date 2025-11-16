const http = require('../utils/httpClient');
const { getServiceUrl } = require('../utils/serviceLocator');
const createBreaker = require('../utils/circuitBreaker');

async function requestEvent(id) {
  const baseUrl = getServiceUrl('EVENT-SERVICE');
  if (!baseUrl) throw new Error("Event service unavailable");

  return http.get(`${baseUrl}/events/${id}`);
}

const eventBreaker = createBreaker(requestEvent);

eventBreaker.fallback(() => {
  console.log("⚠ Using fallback for Event Service");
  return null;
});

// -------------------------------

async function getEventById(eventId) {
  try {
    const response = await eventBreaker.fire(eventId);
    return response.data;
  } catch (err) {
    console.log("❌ Event Service Failure:", err.message);
    return null;
  }
}

async function updateEvent(updatedEvent) {
  const baseUrl = getServiceUrl('EVENT-SERVICE');
  if (!baseUrl) return false;

  try {
    await http.put(`${baseUrl}/events/${updatedEvent.id}`, updatedEvent);
    return true;
  } catch (error) {
    console.log("❌ Failed to update event:", error.message);
    return false;
  }
}

module.exports = { getEventById, updateEvent };
