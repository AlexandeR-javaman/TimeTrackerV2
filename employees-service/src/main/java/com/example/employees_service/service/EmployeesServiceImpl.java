package com.example.employees_service.service;

import com.example.employees_service.dto.EmployeesDTO;
import com.example.employees_service.mapper.EmployeesMapper;
import com.example.employees_service.repository.EmployeesRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeesServiceImpl implements EmployeesService {

    private final EmployeesRepository employeesRepository;

    private final EmployeesMapper employeesMapper;

    public EmployeesServiceImpl(EmployeesRepository employeesRepository, EmployeesMapper employeesMapper, EmployeesMapper employeesMapper1) {
        this.employeesRepository = employeesRepository;
        this.employeesMapper = employeesMapper1;
    }

    @Override
    public List<EmployeesDTO> findAll() {
        return employeesMapper.employeesListToEmployeeDtoList(employeesRepository.findAll());
    }

}
