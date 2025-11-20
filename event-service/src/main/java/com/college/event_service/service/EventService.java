package com.college.event_service.service;

import com.college.event_service.Uitel.CloudinaryUtil;
import com.college.event_service.model.Event;
import com.college.event_service.repository.EventRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class EventService {

    @Autowired
    private final EventRepository eventRepo;

    @Autowired
    private final RegistrationService registrationService;

    private final CloudinaryUtil cloudinaryUtil;

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

    public String uploadEventImage(MultipartFile file, Long eventId) throws IOException {

        Event event = eventRepo.findById(eventId)
                .orElseThrow(() -> new RuntimeException("Event not found with ID: " + eventId));

        // Delete previous image
        cloudinaryUtil.deleteImage(event.getImageUrl());

        // Upload new image
        String imageUrl = cloudinaryUtil.uploadImage(file.getBytes(), "event_images");

        event.setImageUrl(imageUrl);
        eventRepo.save(event);

        return imageUrl;
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
            Event event = eventRepo.findById(eventId).orElse(null);
            if (event == null) return false;

            // 1. Delete registrations
            if (!registrationService.deleteRegistrationsByEvent(eventId)) {
                return false;
            }

            // 2. Delete image from Cloudinary
            cloudinaryUtil.deleteImage(event.getImageUrl());

            // 3. Delete event itself
            eventRepo.deleteById(eventId);

            return true;

        } catch (Exception e) {
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
            if(updatedEvent.getStartRegistrationDate() != null)
                event.setStartRegistrationDate(updatedEvent.getStartRegistrationDate());
            if(updatedEvent.getEndRegistrationDate() != null)
                event.setEndRegistrationDate(updatedEvent.getEndRegistrationDate());
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
