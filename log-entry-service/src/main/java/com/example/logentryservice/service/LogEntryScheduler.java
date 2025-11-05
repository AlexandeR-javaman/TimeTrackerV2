package com.example.logentryservice.service;

import com.example.logentryservice.Repository.LogEntryRepository;
import com.example.logentryservice.dto.MessageDto;
import com.example.logentryservice.model.LogEntry;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.List;

@Slf4j
@Component
@RequiredArgsConstructor
public class LogEntryScheduler {

    private final LogEntryRepository logEntryRepository;
    private final MessageProducer producer;

    @Scheduled(cron = "${scheduler.need-close-cron}")
    public void findNotClosedLogEntries() {
        log.info("Scheduler оповещающий о незавершенных сменах начал работу");
        List<LogEntry> openEntries = logEntryRepository.findByEndTimeIsNull();
        openEntries.forEach(entry -> {
            System.out.println("KeycloakId(): " + entry.getKeycloakId());
            producer.sendNeedClose(new MessageDto(entry.getKeycloakId()));
        });
    }
}
