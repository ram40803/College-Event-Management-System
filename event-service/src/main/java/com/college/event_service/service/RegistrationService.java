package com.college.event_service.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.client.ServiceInstance;
import org.springframework.cloud.client.discovery.DiscoveryClient;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import java.util.List;

@Service
public class RegistrationService {

    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private DiscoveryClient discoveryClient;

    public boolean deleteRegistrationsByEvent(Long eventId) {
        try {
            // Step 1: Discover registration-service instances from Eureka
            List<ServiceInstance> instances = discoveryClient.getInstances("event-registration-service");

            if (instances == null || instances.isEmpty()) {
                System.err.println("❌ No registration-service instances found in Eureka.");
                return false;
            }

            // Step 2: Use the first available instance
            ServiceInstance instance = instances.getFirst();
            String baseUrl = instance.getUri().toString(); // e.g., http://172.18.0.3:5000

            // Step 3: Construct the target API endpoint
            String url = baseUrl + "/registrations/event/" + eventId;

            System.out.println("📡 Calling Registration Service dynamically at: " + url);

            // Step 4: Execute DELETE request
            ResponseEntity<String> response = restTemplate.exchange(
                    url,
                    HttpMethod.DELETE,
                    null,
                    String.class
            );

            return response.getStatusCode().is2xxSuccessful();

        } catch (Exception e) {
            System.err.println("❌ Error calling Registration Service: " + e.getMessage());
            return false;
        }
    }
}
