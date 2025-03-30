package com.example.employees_service.service;

import com.example.employees_service.dto.EmployeesDTO;
import com.example.employees_service.mapper.EmployeesMapper;
import com.example.employees_service.repository.EmployeesRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class EmployeesServiceImpl implements EmployeesService {

    private final EmployeesRepository employeesRepository;

    private final EmployeesMapper employeesMapper;

    public EmployeesServiceImpl(EmployeesRepository employeesRepository, EmployeesMapper employeesMapper) {
        this.employeesRepository = employeesRepository;
        this.employeesMapper = employeesMapper;
    }

    @Override
    public List<EmployeesDTO> findAll() {
//        return employeesMapper.employeesListToEmployeesDTOList(employeesRepository.findAll());
        return employeesRepository.findAll().stream()
                .map(employees -> EmployeesDTO.builder()
                        .id(employees.getId())
                        .name(employees.getName())
                        .date(LocalDate.now())
                        .build())
                .collect(Collectors.toList());
    }

}
