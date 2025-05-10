package com.example.logentryservice.service;

import com.example.logentryservice.dto.LogEntryDto;

import java.util.List;

public interface LogEntryService {
    List<LogEntryDto> findall();
}
