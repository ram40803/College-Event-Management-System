const httpClient = require('../utils/httpClient');
const { getServiceUrl } = require('./serviceLocator');

async function getUserById(eventId) {
  const baseUrl = getServiceUrl('USER-SERVICE');
  const response = await httpClient.get(`${baseUrl}/events/${eventId}`);
  return response.data;
}

async function getAllUsers(){
  const baseUrl = getServiceUrl('USER-SERVICE');
  try{
    const response = await httpClient.get(`${baseUrl}/events`);
    return response.data;
  }
  catch(error){
    console.log(`service::eventService::getAllEvents: ${error}`)
  }
  
}

module.exports = { getEventById, getAllEvents };
