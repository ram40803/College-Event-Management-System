const http = require('../utils/httpClient');
const { getServiceUrl } = require('../utils/serviceLocator');
const createBreaker = require('../utils/circuitBreaker');

async function requestUser(id) {
  const baseUrl = getServiceUrl('USER-SERVICE');
  if (!baseUrl) throw new Error("User service unavailable");

  return http.get(`${baseUrl}/users/${id}`);
}

const userBreaker = createBreaker(requestUser);

userBreaker.fallback(() => {
  console.log("⚠ User service fallback");
  return null;
});

async function getUserById(userId) {
  try {
    const response = await userBreaker.fire(userId);
    return response.data;
  } catch (err) {
    console.log("❌ User Service Failure:", err.message);
    return null;
  }
}

module.exports = { getUserById };
