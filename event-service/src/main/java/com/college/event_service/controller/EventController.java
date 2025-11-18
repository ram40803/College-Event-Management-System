package com.college.event_service.controller;

import com.college.event_service.model.Event;
import com.college.event_service.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/events")
public class EventController {

    @Autowired
    private EventService eventService;

    @PostMapping
    public ResponseEntity<Map<String, Object>> createEvent(@RequestBody Event event) {
        Event savedEvent = eventService.createEvent(event);

        Map<String, Object> response = new HashMap<>();
        response.put("message", "Event created successfully");
        response.put("id", savedEvent.getId());

        return ResponseEntity.ok(response);
    }

    @PostMapping("/{eventId}/upload-image")
    public ResponseEntity<?> uploadEventImage(
            @PathVariable Long eventId,
            @RequestParam("file") MultipartFile file) {
        try {
            String imageUrl = eventService.uploadEventImage(file, eventId);
            return ResponseEntity.ok(Map.of("imageUrl", imageUrl));
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Upload failed: " + e.getMessage());
        }
    }

    @GetMapping
    public Page<Event> getAllEvents(@RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return eventService.getAllEvents(page, size);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Event> getEventById(@PathVariable Long id) {
        return eventService.getEventById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> updateEvent(@PathVariable Long id, @RequestBody Event updatedEvent) {
        try {
            eventService.updateEvent(id, updatedEvent);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEvent(@PathVariable Long id) {
        if (eventService.deleteById(id))
            return ResponseEntity.noContent().build();
        else
            return ResponseEntity.internalServerError().build();
    }

    @GetMapping("/search")
    public ResponseEntity<Page<Event>> searchEvents(
            @RequestParam("keyword") String keyword,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Page<Event> events = eventService.searchEvents(keyword, page, size);
        if (events.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(events);
    }
}
