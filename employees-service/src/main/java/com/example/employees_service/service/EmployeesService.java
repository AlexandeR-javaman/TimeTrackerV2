package com.example.employees_service.service;

import com.example.employees_service.dto.EmployeesDTO;

import java.util.List;

public interface EmployeesService {
    List<EmployeesDTO> findAll();
}
