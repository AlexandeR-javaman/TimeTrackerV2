package com.example.logentryservice.service;

import com.example.logentryservice.Repository.LogEntryRepository;
import com.example.logentryservice.dto.request.EndRequest;
import com.example.logentryservice.dto.request.StartRequest;
import com.example.logentryservice.dto.response.GetLogEntryByEmployeeIdResponse;
import com.example.logentryservice.exception.EntityIsExistException;
import com.example.logentryservice.exception.EntityNotFoundException;
import com.example.logentryservice.model.LogEntry;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class LogEntryService {

    private final LogEntryRepository logEntryRepository;

    public Long startLogEntry(StartRequest request) {
        Optional<LogEntry> startLogEntry = logEntryRepository.findByEmployeeIdAndEndTimeIsNull(request.employeeId());
        if (startLogEntry.isPresent()) {
            throw new EntityIsExistException("У Вас уже есть незавершенная смена");
        }
        LogEntry logEntry = LogEntry.builder()
                .startTime(LocalDateTime.now())
                .employeeId(request.employeeId())
                .build();
        LogEntry savedLogEntry = logEntryRepository.save(logEntry);
        return savedLogEntry.getId();
    }

    public void endLogEntry(EndRequest request) {
        LogEntry logEntry = logEntryRepository.findByEmployeeIdAndEndTimeIsNull(request.employeeId())
                .orElseThrow(() -> new EntityNotFoundException("У Вас еще нет начатых смен"));
        logEntry.setEndTime(LocalDateTime.now());
        logEntry.setMessage(request.message());
        var duration = Duration.between(logEntry.getStartTime(), logEntry.getEndTime());
        logEntry.setJobTime(duration.toSeconds()); // позднее исправить на toHours() или toMinutes()
        logEntryRepository.save(logEntry);
    }

    public GetLogEntryByEmployeeIdResponse getAllLogEntriesByEmployee(Long employeeId){
        List<LogEntry> logEntryList = logEntryRepository.findByEmployeeId(employeeId);
        return new GetLogEntryByEmployeeIdResponse(logEntryList);
    }
}
