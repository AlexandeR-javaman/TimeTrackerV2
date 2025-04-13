package com.example.employees_service.service;

import com.example.employees_service.dto.EmployeeCreateUpdateDTO;
import com.example.employees_service.dto.EmployeesDTO;

import java.util.List;
import java.util.Optional;

public interface EmployeesService {
    List<EmployeesDTO> findAll();
    Optional<EmployeesDTO> findById(Long id);
    EmployeesDTO save(EmployeeCreateUpdateDTO createEmployeeDto);
    EmployeesDTO update(EmployeeCreateUpdateDTO updateEmployeeDto, Long id);
    boolean deleteById(Long id);
}
