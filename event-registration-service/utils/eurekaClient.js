const Eureka = require('eureka-js-client').Eureka;

const port = 8083;
const host = 'event-registration-service'

const client = new Eureka({
  instance: {
    app: 'EVENT-REGISTRATION-SERVICE',
    hostName: host,
    ipAddr: host,
    port: { '$': port, '@enabled': true },
    vipAddress: 'EVENT-REGISTRATION-SERVICE',
    dataCenterInfo: {
      '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
      name: 'MyOwn'
    },
    statusPageUrl: `http://${host}:${port}/info`,
    healthCheckUrl: `http://${host}:${port}/health`,
  },
  eureka: {
    host: process.env.EUREKA_HOST || 'eureka-server',
    port: process.env.EUREKA_PORT || 8761,
    servicePath: '/eureka/apps/'
  }
});

client.start(err => {
  if (err) console.error('Eureka registration failed:', err);
  else console.log('Registered with Eureka successfully');
});

module.exports = client;
