package com.example.employees_service.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EmployeesDTO {

    private Long id;

    private String surname;

    private String name;

    private String patronymic;

    private int stuffId;

    private String employeePost;

    private String role;

    private String login;

    private Integer password;

}
