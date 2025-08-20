package com.example.employees_service.dto;

public record EmployeeUpdateDto(String surname,
                                String name,
                                String patronymic,
                                Long stuffId,
                                String employeePost) {
}
