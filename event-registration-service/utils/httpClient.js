const axios = require('axios');
const axiosRetry = require("axios-retry").default;

const httpClient = axios.create({
  timeout: 5000,
});

// Retry failed requests automatically
axiosRetry(httpClient, {
  retries: 3,
  retryDelay: axiosRetry.exponentialDelay,
  retryCondition: (err) => axiosRetry.isNetworkError(err) || axiosRetry.isRetryableError(err),
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
