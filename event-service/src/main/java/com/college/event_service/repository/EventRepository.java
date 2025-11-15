package com.college.event_service.repository;

import com.college.event_service.model.Event;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {
    @Query("SELECT e FROM Event e " +
            "WHERE LOWER(e.name) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
            " OR LOWER(e.description) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
            " OR LOWER(e.location) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
            " OR LOWER(e.organizer) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    Page<Event> searchByKeyword(
            @Param("keyword") String keyword,
            Pageable pageable
    );
}
