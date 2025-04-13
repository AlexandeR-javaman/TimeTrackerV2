package com.example.employees_service.service;

import com.example.employees_service.dto.EmployeeCreateUpdateDto;
import com.example.employees_service.dto.EmployeeDto;

import java.util.List;
import java.util.Optional;

public interface EmployeeService {
    List<EmployeeDto> findAll();
    Optional<EmployeeDto> findById(Long id);
    EmployeeDto save(EmployeeCreateUpdateDto createEmployeeDto);
    EmployeeDto update(EmployeeCreateUpdateDto updateEmployeeDto, Long id);
    boolean deleteById(Long id);
}
