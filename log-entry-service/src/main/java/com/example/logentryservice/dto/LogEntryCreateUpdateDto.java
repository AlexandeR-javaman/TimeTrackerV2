package com.example.logentryservice.dto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LogEntryCreateUpdateDto {

    private LocalDateTime startTime;

    private LocalDateTime endTime;

    private int employeeId;

    private String message;

    private Long jobTime;

    //   private LocalDate date;

}
