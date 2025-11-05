package com.example.logentryservice.controller;


import com.example.logentryservice.dto.MessageDto;
import com.example.logentryservice.service.MessageProducer;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class MessageController {

    private final MessageProducer producer;

    @GetMapping("/send")
    public String sendMessage() {
        producer.send(new MessageDto("test-employee1@rambler.ru", "Текст сообщения в кафку"));
        return "Message sent to Kafka!";
    }
    @PostMapping("/send")
    public String sendMessagePost(@RequestBody MessageDto message) {
        producer.send(message);
        return "Message sent to Kafka: " + message.text();
    }
}


