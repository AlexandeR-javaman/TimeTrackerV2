package com.example.logentryservice.model;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "log_entries")
@Access(AccessType.FIELD)
public class LogEntry {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "start_time", nullable = false)
    private LocalDateTime startTime;

    @Column(name = "end_time", nullable = false)
    private LocalDateTime endTime;

    @Column(name = "employee_id", nullable = false)
    private int employeeId;

    @Column(name = "message", nullable = false)
    private String message;

    @Column(name = "job_time", nullable = false)
    private Long jobTime;
}
