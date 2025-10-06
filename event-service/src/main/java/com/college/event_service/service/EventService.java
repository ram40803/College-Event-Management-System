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

    public Event createEvent(Event event){
        return eventRepo.save(event);
    }

    public List<Event> getAllEvents(){
        return eventRepo.findAll();
    }

    public Optional<Event> getEventById(Long id){
        return eventRepo.findById(id);
    }

    public void deleteById(Long id){
        eventRepo.deleteById(id);
    }
}
