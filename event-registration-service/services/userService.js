const httpClient = require('../utils/httpClient');
const { getServiceUrl } = require('./serviceLocator');

async function getUserById(userId) {
  const baseUrl = getServiceUrl('USER-SERVICE');
  const response = await httpClient.get(`${baseUrl}/users/${userId}`);
  return response.data;
}

module.exports = { getUserById };
