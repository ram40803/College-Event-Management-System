const axios = require('axios');

const httpClient = axios.create({
  timeout: 5000,
});

httpClient.interceptors.request.use(request => {
  console.log(`📤 [${request.method.toUpperCase()}] ${request.url}`);
  return request;
});

httpClient.interceptors.response.use(
  response => {
    console.log(`✅ Response: ${response.status} from ${response.config.url}`);
    return response;
  },
  error => {
    console.error(`❌ Error: ${error.message} from ${error.config?.url}`);
    return Promise.reject(error);
  }
);

module.exports = httpClient;
