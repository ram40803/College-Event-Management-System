const eurekaClient = require('./eurekaClient');

const serviceIndex = {}; // for round-robin load balancing

function getServiceUrl(serviceName) {
  const instances = eurekaClient.getInstancesByAppId(serviceName.toUpperCase());

  if (!instances || instances.length === 0) {
    console.log(`❌ Service ${serviceName} not found in Eureka`);
    return null;
  }

  // Filter only UP / healthy services
  const healthyInstances = instances.filter(i => 
    i.status === "UP" || i.healthCheckUrl
  );

  if (healthyInstances.length === 0) {
    console.log(`⚠ No healthy instances for ${serviceName}`);
    return null;
  }

  // Round Robin Load Balancing
  if (!serviceIndex[serviceName]) serviceIndex[serviceName] = 0;
  
  const index = serviceIndex[serviceName] % healthyInstances.length;
  serviceIndex[serviceName]++;

  const instance = healthyInstances[index];

  return `http://${instance.hostName}:${instance.port.$}`;
}

module.exports = { getServiceUrl };
