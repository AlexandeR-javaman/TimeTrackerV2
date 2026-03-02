package com.example.logentryservice;

import com.example.logentryservice.Repository.LogEntryRepository;
import com.example.logentryservice.dto.MessageDto;
import com.example.logentryservice.model.LogEntry;
import com.example.logentryservice.service.LogEntryScheduler;
import com.example.logentryservice.service.MessageProducer;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.ActiveProfiles;

import java.time.LocalDateTime;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

@SpringBootTest
@ActiveProfiles("test")
class LogEntrySchedulerIntegrationTest extends BaseIntegrationTest {

    @Autowired
    private LogEntryRepository logEntryRepository;

    @Autowired
    private LogEntryScheduler scheduler;

    @MockBean
    private MessageProducer producer;

    @Test
    void findNotClosedLogEntries_shouldSendMessagesForOpenShifts() {
        // Подготовка: одна незавершённая смена
        LogEntry entry = LogEntry.builder()
                .keycloakId("user-1")
                .employeeId(1L)
                .startTime(LocalDateTime.now().minusHours(3))
                .build();
        logEntryRepository.save(entry);

        // Вызов метода планировщика напрямую
        scheduler.findNotClosedLogEntries();

        // Проверка, что producer.sendNeedClose вызван с нужным keycloakId
        ArgumentCaptor<MessageDto> captor = ArgumentCaptor.forClass(MessageDto.class);
        verify(producer, times(1)).sendNeedClose(captor.capture());
        assertThat(captor.getValue().keycloakId()).isEqualTo("user-1");
    }

    @Test
    void findNotOpenLogEntries_shouldSendMessagesForEmployeesWithoutShifts() {
        // Подготовка: создаём список сотрудников
        String employeesJson = """
            [
                {"stuffId":1,"keycloakId":"user-1","name":"John","role":"ROLE_USER"},
                {"stuffId":2,"keycloakId":"user-2","name":"Jane","role":"ROLE_USER"}
            ]
            """;

        // Мокаем WireMock
        employeesWireMock.stubAllEmployees(employeesJson);

        // В репозитории нет записей, значит ни у кого смена не начата
        scheduler.findNotOpenLogEntries();

        // Проверка, что producer.sendNeedOpen вызван для обоих сотрудников
        ArgumentCaptor<MessageDto> captor = ArgumentCaptor.forClass(MessageDto.class);
        verify(producer, times(2)).sendNeedOpen(captor.capture());

        List<MessageDto> messages = captor.getAllValues();
        assertThat(messages).extracting(MessageDto::keycloakId)
                .containsExactlyInAnyOrder("user-1", "user-2");
    }

    @Test
    void findNotOpenLogEntries_shouldNotSendMessagesForAdmin() {
        String adminJson = """
            [
                {"stuffId":1,"keycloakId":"admin-1","name":"Admin","role":"ROLE_ADMIN"}
            ]
            """;

        // Мокаем WireMock
        employeesWireMock.stubAllEmployees(adminJson);

        scheduler.findNotOpenLogEntries();

        // Проверяем, что сообщений для админа не было
        verify(producer, never()).sendNeedOpen(any());
    }
}