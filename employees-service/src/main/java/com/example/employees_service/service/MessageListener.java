package com.example.employees_service.service;

import com.example.employees_service.dto.MessageDto;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class MessageListener {

    private final ObjectMapper objectMapper = new ObjectMapper();

    @KafkaListener(topics = "${kafka.topic.message-topic}",
                   groupId = "${spring.application.name}",
                   containerFactory = "kafkaListenerContainerFactory")
    public void listen(ConsumerRecord<String, Object> record) {
        Object value = record.value(); // <-- только значение
        MessageDto dto = objectMapper.convertValue(value, MessageDto.class);
        System.out.println("📩 Received message: " +
                dto.getText());
    }
}
