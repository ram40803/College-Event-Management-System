package com.eventsystem.eventservice.repository;

import com.eventsystem.eventservice.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventRepository extends JpaRepository<Event, Long> {
}
