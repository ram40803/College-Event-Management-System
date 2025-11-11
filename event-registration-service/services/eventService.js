const httpClient = require('../utils/httpClient');
const { getServiceUrl } = require('./serviceLocator');

async function getEventById(eventId) {
  const baseUrl = getServiceUrl('EVENT-SERVICE');
  
  try{
    const response = await httpClient.get(`${baseUrl}/events/${eventId}`);
    return response.data;
  }
  catch(error){
    console.log(`service::eventService::getAllEvents: ${error}`);
  }
}

async function updateEvent(updatedEvent){
  const baseUrl = getServiceUrl('EVENT-SERVICE');
  try{
    await httpClient.put(`${baseUrl}/events/${updatedEvent.id}`, updatedEvent);
    return true;
  }
  catch(error){
    console.log(`service::eventService::updateEvent: ${error}`);
    return false;
  }
}

module.exports = { getEventById, updateEvent};
