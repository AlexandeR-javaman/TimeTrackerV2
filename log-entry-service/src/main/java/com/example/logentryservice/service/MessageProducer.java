package com.example.logentryservice.service;

import com.example.logentryservice.dto.MessageDto;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MessageProducer {

    private final KafkaTemplate<String, Object> kafkaTemplate;

    @Value("${kafka.topic.message-topic}")
    private String topic;

    public void send(MessageDto message) {
        kafkaTemplate.send(topic, message);
        System.out.println("✅ Sent to Kafka: " + message.getText());
    }
}
