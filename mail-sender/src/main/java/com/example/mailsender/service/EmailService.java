package com.example.mailsender.service;

import com.example.mailsender.config.MailConfig;
import com.example.mailsender.dto.MessageDto;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;
    private final MailConfig config;

    void sendNeedCloseEntryMail(MessageDto messageDto) {
        System.out.println("Сообщение отправлено на емэйл " + messageDto.text());
        SimpleMailMessage mail = new SimpleMailMessage();
        mail.setTo(messageDto.email());
        mail.setSubject("Важное письмо от работодателя");
        mail.setText(messageDto.text());
        mail.setFrom(config.getUsername());
        mailSender.send(mail);
    }

    void sendNeedOpenEntryMail(MessageDto messageDto) {
        System.out.println("Сообщение второе должно быть отправлено на емэйл " + messageDto.text());
    }
}
