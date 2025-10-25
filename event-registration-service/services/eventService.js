const httpClient = require('../utils/httpClient');
const { getServiceUrl } = require('./serviceLocator');

async function getEventById(eventId) {
  const baseUrl = getServiceUrl('EVENT-SERVICE');
  const response = await httpClient.get(`${baseUrl}/events/${eventId}`);
  return response.data;
}

async function getAllEvents(){
  const baseUrl = getServiceUrl('EVENT-SERVICE');
  try{
    const response = await httpClient.get(`${baseUrl}/events`);
    return response.data;
  }
  catch(error){
    console.log(`service::eventService::getAllEvents: ${error}`)
  }
  
}

module.exports = { getEventById, getAllEvents };
