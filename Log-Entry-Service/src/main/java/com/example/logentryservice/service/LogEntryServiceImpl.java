package com.example.logentryservice.service;

import com.example.logentryservice.Repository.LogEntryRepository;
import com.example.logentryservice.dto.LogEntryDto;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class LogEntryServiceImpl implements LogEntryService {

    private final LogEntryRepository logEntryRepository;

    public LogEntryServiceImpl(LogEntryRepository logEntryRepository) {
        this.logEntryRepository = logEntryRepository;
    }

    @Override
    public List<LogEntryDto> findall(){
        return logEntryRepository.findAll().stream()
                .map(logEntry -> LogEntryDto.builder()
                        .id(logEntry.getId())
                        .startTime(logEntry.getStartTime())
                        .endTime(logEntry.getEndTime())
                        .employeeId(logEntry.getEmployeeId())
                        .message(logEntry.getMessage())
                        .jobTime(logEntry.getJobTime())
                        .date(LocalDate.now())
                        .build())
                .collect(Collectors.toList());
    }



}
