package com.college.event_service.controller;

import com.college.event_service.model.Event;
import com.college.event_service.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/events")
public class EventController {

    @Autowired
    private EventService eventService;

    @PostMapping
    public void createEvent(@RequestBody Event event){
        eventService.createEvent(event);
    }

    @GetMapping
    public List<Event> getAllEvents(){
        return eventService.getAllEvents();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Event> getEventById(@PathVariable Long id){
        return eventService.getEventById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEvent(@PathVariable Long id){
        eventService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}

