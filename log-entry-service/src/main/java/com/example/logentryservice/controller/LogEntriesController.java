package com.example.logentryservice.controller;


import com.example.logentryservice.dto.LogEntryCreateUpdateDto;
import com.example.logentryservice.dto.LogEntryDto;
import com.example.logentryservice.dto.request.EndRequest;
import com.example.logentryservice.dto.request.StartRequest;
import com.example.logentryservice.dto.response.StartResponse;
import com.example.logentryservice.service.LogEntryService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/log_entries")
public class LogEntriesController {

    private final LogEntryService logEntryService;

    public LogEntriesController(LogEntryService logEntryService) {
        this.logEntryService = logEntryService;
    }

    @GetMapping()
    public ResponseEntity<List<LogEntryDto>> getAllLogEntries() {
        List<LogEntryDto> LogEntryDtoList = logEntryService.findAll();
        return ResponseEntity.ok().body(LogEntryDtoList);
    }

    @GetMapping("/{id}")
    public ResponseEntity<LogEntryDto> getLogEntryById(@PathVariable Long id) {
        Optional<LogEntryDto> logEntryDto = logEntryService.findById(id);
        return logEntryDto.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @PostMapping("/start")
    public ResponseEntity<StartResponse> startLogEntry(@RequestBody StartRequest request) {
        Long logEntryId = logEntryService.startLogEntry(request.employeeId());
        StartResponse response = new StartResponse(logEntryId);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PutMapping("/end")
    public ResponseEntity<String> endLogEntry(@RequestBody EndRequest request) {
        logEntryService.endLogEntry(request.logEntryId());
        return ResponseEntity.ok("Смена завершена");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLogEntry(@PathVariable Long id) {
        return logEntryService.deleteById(id) ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }
}
