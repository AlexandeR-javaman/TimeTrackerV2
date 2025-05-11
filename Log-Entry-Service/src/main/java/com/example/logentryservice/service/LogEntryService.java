package com.example.logentryservice.service;

import com.example.logentryservice.dto.LogEntryCreateUpdateDto;
import com.example.logentryservice.dto.LogEntryDto;

import java.util.List;
import java.util.Optional;

public interface LogEntryService {
    List<LogEntryDto> findAll();
    Optional<LogEntryDto> findById(Long id);
    LogEntryDto save(LogEntryCreateUpdateDto createEmployeeDto);
    LogEntryDto update(LogEntryCreateUpdateDto updateLogEntryDto, Long id);
    boolean deleteById(Long id);
}
