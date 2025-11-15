package com.college.event_service.service;

import com.college.event_service.model.Event;
import com.college.event_service.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class EventService {

    @Autowired
    private EventRepository eventRepo;

    @Autowired
    private RegistrationService registrationService;

    public String getStatus(Event event) {
        LocalDateTime now = LocalDateTime.now();

        if (now.isBefore(event.getStartDate())) {
            return "UPCOMING";
        } else if (!now.isAfter(event.getEndDate())) {
            return "ONGOING";
        } else {
            return "COMPLETED";
        }
    }

    public Event createEvent(Event event){
        return eventRepo.save(event);
    }

    public Page<Event> getAllEvents(int page, int size){
        Pageable pageable = PageRequest.of(page, size, Sort.by("id").ascending());
        return eventRepo.findAll(pageable);
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
            if(updatedEvent.getMaxParticipantsCapacity() != null)
                event.setMaxParticipantsCapacity(updatedEvent.getMaxParticipantsCapacity());
            if(updatedEvent.getCurrentParticipants() != null)
                event.setCurrentParticipants(updatedEvent.getCurrentParticipants());
            if(updatedEvent.getStartDate() != null)
                event.setStartDate(updatedEvent.getStartDate());
            if(updatedEvent.getEndDate() != null)
                event.setEndDate(updatedEvent.getEndDate());
            if(updatedEvent.getLocation() != null)
                event.setLocation(updatedEvent.getLocation());
            if(updatedEvent.getOrganizer() != null)
                event.setOrganizer(updatedEvent.getOrganizer());

            return eventRepo.save(event);
        }).orElseThrow(() -> new RuntimeException("Event not found"));
    }

    public Page<Event> searchEvents(String keyword, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return eventRepo.searchByKeyword(keyword, pageable);
    }
}
