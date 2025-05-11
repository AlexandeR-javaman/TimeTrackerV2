package com.example.logentryservice.service;

import com.example.logentryservice.LogEntryServiceApplication;
import com.example.logentryservice.Repository.LogEntryRepository;
import com.example.logentryservice.dto.LogEntryCreateUpdateDto;
import com.example.logentryservice.dto.LogEntryDto;
//import com.example.logentryservice.exception.LogEntryNotFoundException;
import com.example.logentryservice.model.LogEntry;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class LogEntryServiceImpl implements LogEntryService {

    private final LogEntryRepository logEntryRepository;
    private final LogEntryServiceApplication logEntryServiceApplication;

    public LogEntryServiceImpl(LogEntryRepository logEntryRepository, LogEntryServiceApplication logEntryServiceApplication) {
        this.logEntryRepository = logEntryRepository;
        this.logEntryServiceApplication = logEntryServiceApplication;
    }

    @Override
    public List<LogEntryDto> findAll(){
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
    @Override
    public Optional<LogEntryDto> findById(Long id) {
//        return employeesRepository.findById(id)       // если надо через маппер
//                .map(employeesMapper::entityToDto);  // если надо через маппер
        return logEntryRepository.findById(id)
                .map(logEntry -> LogEntryDto.builder()
                        .id(logEntry.getId())
                        .startTime(logEntry.getStartTime())
                        .endTime(logEntry.getEndTime())
                        .employeeId(logEntry.getEmployeeId())
                        .message(logEntry.getMessage())
                        .jobTime(logEntry.getJobTime())
                        .date(LocalDate.now())
                        .build());
    }

    @Override
    public LogEntryDto save(LogEntryCreateUpdateDto createLogEntryDTO) {
//        Employees employee = employeesMapper.dtoToEntity(createEmployeeDTO); // если через маппер, но не будет даты
        LogEntry logEntry = LogEntry.builder()
                .startTime(createLogEntryDTO.getStartTime())
                .endTime(createLogEntryDTO.getEndTime())
                .employeeId(createLogEntryDTO.getEmployeeId())
                .message(createLogEntryDTO.getMessage())
                .jobTime(createLogEntryDTO.getJobTime())   // должно вычисляться автоматически
                .build();
        LogEntry savedLogEntry = logEntryRepository.save(logEntry);
//        return employeesMapper.entityToDto(savedEmployee); // если через маппер, но не будет даты
        return LogEntryDto.builder()
                .id(savedLogEntry.getId())
                .startTime(savedLogEntry.getStartTime())
                .endTime(savedLogEntry.getEndTime())
                .employeeId(savedLogEntry.getEmployeeId())
                .message(savedLogEntry.getMessage())
                .jobTime(savedLogEntry.getJobTime())
                .date(LocalDate.now())
                .build();
    }
    @Override
    public LogEntryDto update(LogEntryCreateUpdateDto logEntryDTO, Long id) {
        return logEntryRepository.findById(id)
                .map(foundLogEntry -> {
                    foundLogEntry.setStartTime(logEntryDTO.getStartTime());
                    foundLogEntry.setEndTime(logEntryDTO.getEndTime());
                    foundLogEntry.setEmployeeId(logEntryDTO.getEmployeeId());
                    foundLogEntry.setMessage(logEntryDTO.getMessage());
                    foundLogEntry.setJobTime(logEntryDTO.getJobTime());
                    LogEntry updatedLogEntry = logEntryRepository.save(foundLogEntry);
//                    return logEntryMapper.entityToDto(updatedLogEntry);
                    return LogEntryDto.builder()
                            .id(updatedLogEntry.getId())
                            .startTime(updatedLogEntry.getStartTime())
                            .endTime(updatedLogEntry.getEndTime())
                            .employeeId(updatedLogEntry.getEmployeeId())
                            .message(updatedLogEntry.getMessage())
                            .jobTime(updatedLogEntry.getJobTime())
                            .date(LocalDate.now())
                            .build();
                })
                .orElse(null);
    }

    @Override
    public boolean deleteById(Long id) {
        if (logEntryRepository.existsById(id)) {
            logEntryRepository.deleteById(id);
            return true;
        }
        return false;
    }

    @Override
    public Long startLogEntry(int employeeId) {
        LogEntry logEntry = LogEntry.builder()
                .startTime(LocalDateTime.now())
                .employeeId(employeeId)
                .build();
        LogEntry savedLogEntry = logEntryRepository.save(logEntry);
        return savedLogEntry.getId();
    }

    @Override
    public void endLogEntry(Long logEntryId) {
        LogEntry logEntry = logEntryRepository.findById(logEntryId)
                .orElseThrow();// -> new LogEntryNotFoundException("Смена не найдена"));
        logEntry.setEndTime(LocalDateTime.now());
        logEntryRepository.save(logEntry);
    }


}
