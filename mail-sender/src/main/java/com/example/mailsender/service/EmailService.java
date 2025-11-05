package com.example.mailsender.service;

import com.example.mailsender.Integration.EmployeesClient;
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
    private final EmployeesClient employeesClient;

    void sendNeedCloseEntryMail(MessageDto messageDto) {
        System.out.println("Сообщение отправлено на емэйл " + " с текстом " + messageDto.keycloakId());
        SimpleMailMessage mail = new SimpleMailMessage();
        mail.setSubject("Важное письмо от работодателя");
        mail.setText(messageDto.keycloakId());
        mail.setFrom(config.getUsername());

        var employee = employeesClient.getEmployeeById(messageDto.keycloakId());
        System.out.println("Сообщение отправлено пользователю " + employee.getSurname());
//        mail.setTo(employee.getEmail());
        //        mailSender.send(mail);
    }

    void sendNeedOpenEntryMail(MessageDto messageDto) {
        System.out.println("Сообщение второе должно быть отправлено на емэйл " + messageDto.keycloakId());
    }
}
