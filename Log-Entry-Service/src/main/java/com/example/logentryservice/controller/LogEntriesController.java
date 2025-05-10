package com.example.logentryservice.controller;


import com.example.logentryservice.service.LogEntryService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/log_entries")
public class LogEntriesController {

    private final LogEntryService logEntryService;

    public LogEntriesController(LogEntryService logEntryService) {
        this.logEntryService = logEntryService;
    }
}
