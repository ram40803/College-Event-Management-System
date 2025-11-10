package com.college.event_service.service;

import com.college.event_service.model.Event;
import com.college.event_service.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EventService {

    @Autowired
    private EventRepository eventRepo;

    @Autowired
    private RegistrationService registrationService;

    public Event createEvent(Event event){
        return eventRepo.save(event);
    }

    public List<Event> getAllEvents(){
        return eventRepo.findAll();
    }

    public Optional<Event> getEventById(Long id){
        return eventRepo.findById(id);
    }

    public boolean deleteById(Long eventId) {
        try {
            // Step 1: Call Registration Service
            boolean deleted = registrationService.deleteRegistrationsByEvent(eventId);

            if (!deleted) {
                System.err.println("❌ Registration deletion failed. Event not deleted.");
                return false;
            }

            // Step 2: Delete event from DB
            if (eventRepo.existsById(eventId)) {
                eventRepo.deleteById(eventId);
                System.out.println("✅ Event deleted successfully: " + eventId);
                return true;
            }

            return false;

        } catch (Exception e) {
            System.err.println("Error deleting event: " + e.getMessage());
            return false;
        }
    }


    public void updateEvent(Long id, Event updatedEvent) {
        eventRepo.findById(id).map(event -> {
            if(updatedEvent.getName() != null)
                event.setName(updatedEvent.getName());
            if(updatedEvent.getDescription() != null)
                event.setDescription(updatedEvent.getDescription());
            if(updatedEvent.getStatus() != null)
                event.setStatus(updatedEvent.getStatus());
            if(updatedEvent.getMaxParticipantsCapacity() != 0)
                event.setMaxParticipantsCapacity(updatedEvent.getMaxParticipantsCapacity());
            if(updatedEvent.getCurrentParticipants() >= 0)
                event.setCurrentParticipants(updatedEvent.getCurrentParticipants());
            if(updatedEvent.getDate() != null)
                event.setDate(updatedEvent.getDate());
            if(updatedEvent.getLocation() != null)
                event.setLocation(updatedEvent.getLocation());
            if(updatedEvent.getOrganizer() != null)
                event.setOrganizer(updatedEvent.getOrganizer());

            return eventRepo.save(event);
        }).orElseThrow(() -> new RuntimeException("Event not found"));
    }
}
