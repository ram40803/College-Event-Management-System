const httpClient = require('../utils/httpClient');
const { getServiceUrl } = require('./serviceLocator');

async function getUserById(userId) {
  const baseUrl = getServiceUrl('USER-SERVICE');
  
  try{
    const response = await httpClient.get(`${baseUrl}/users/${userId}`);
    return response.data;
  }
  catch(error){
    console.log(`service::eventService::getAllEvents: ${error}`);
  }
}

module.exports = { getUserById };
