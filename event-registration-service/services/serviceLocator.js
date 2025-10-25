const eurekaClient = require('../utils/eurekaClient');

function getServiceUrl(serviceName) {
  const instances = eurekaClient.getInstancesByAppId(serviceName.toUpperCase());
  if (!instances || instances.length === 0) {
    // throw new Error(`Service ${serviceName} not found in Eureka`);
    console.log(`Service ${serviceName} not found in Eureka`);
  }
  else {
    const instance = instances[0];
    return `http://${instance.hostName}:${instance.port.$}`;
  }
}

module.exports = { getServiceUrl };
