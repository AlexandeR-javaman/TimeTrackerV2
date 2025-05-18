package com.example.logentryservice.Repository;

import com.example.logentryservice.model.LogEntry;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface LogEntryRepository extends JpaRepository<LogEntry, Long> {
    public Optional<LogEntry> findByEmployeeIdAndEndTimeIsNull(Long employeeId);
    public List<LogEntry> findByEmployeeId(Long employeeId);
}
