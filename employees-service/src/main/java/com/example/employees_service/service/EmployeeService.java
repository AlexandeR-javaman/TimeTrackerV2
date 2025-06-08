package com.example.employees_service.service;

import com.example.employees_service.Integration.LogEntryClient;
import com.example.employees_service.dto.EmployeeCreateUpdateDto;
import com.example.employees_service.dto.EmployeeDto;
import com.example.employees_service.dto.EmployeeWithEntryDto;
import com.example.employees_service.dto.LogEntryDto;
import com.example.employees_service.model.Employee;
import com.example.employees_service.repository.EmployeeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EmployeeService {

    private final EmployeeRepository employeeRepository;

    private final LogEntryClient logEntryClient;

    public List<EmployeeDto> findAll() {
//        return employeesMapper.employeesListToEmployeesDTOList(employeesRepository.findAll());
        return employeeRepository.findAll().stream()
                .map(employee -> EmployeeDto.builder()
                        .id(employee.getId())
                        .surname(employee.getSurname())
                        .name(employee.getName())
                        .patronymic(employee.getPatronymic())
                        .stuffId(employee.getStuffId())
                        .employeePost(employee.getEmployeePost())
                        .role(employee.getRole())
                        .date(LocalDate.now())
                        .build())
                .collect(Collectors.toList());
    }

    public Optional<EmployeeDto> findById(Long id) {
//        return employeesRepository.findById(id)       // если надо через маппер
//                .map(employeesMapper::entityToDto);  // если надо через маппер
        return employeeRepository.findById(id)
                .map(employee -> EmployeeDto.builder()
                        .id(employee.getId())
                        .surname(employee.getSurname())
                        .name(employee.getName())
                        .patronymic(employee.getPatronymic())
                        .stuffId(employee.getStuffId())
                        .employeePost(employee.getEmployeePost())
                        .role(employee.getRole())
                        .date(LocalDate.now())
                        .build());
    }

    public EmployeeDto save(EmployeeCreateUpdateDto createEmployeeDTO) {
//        Employees employee = employeesMapper.dtoToEntity(createEmployeeDTO); // если через маппер, но не будет даты
        Employee employee = Employee.builder()
                .surname(createEmployeeDTO.getSurname())
                .name(createEmployeeDTO.getName())
                .patronymic(createEmployeeDTO.getPatronymic())
                .stuffId(createEmployeeDTO.getStuffId())
                .employeePost(createEmployeeDTO.getEmployeePost())
                .role(createEmployeeDTO.getRole())
                .login(createEmployeeDTO.getLogin())
                .password(createEmployeeDTO.getPassword())
                .build();
        Employee savedEmployee = employeeRepository.save(employee);
//        return employeesMapper.entityToDto(savedEmployee); // если через маппер, но не будет даты
        return EmployeeDto.builder()
                .id(savedEmployee.getId())
                .surname(savedEmployee.getSurname())
                .name(savedEmployee.getName())
                .patronymic(savedEmployee.getPatronymic())
                .stuffId(savedEmployee.getStuffId())
                .employeePost(savedEmployee.getEmployeePost())
                .role(savedEmployee.getRole())
                .date(LocalDate.now())
                .build();
    }

    public EmployeeDto update(EmployeeCreateUpdateDto employeeDTO, Long id) {
        return employeeRepository.findById(id)
                .map(foundEmployee -> {
                    foundEmployee.setSurname(employeeDTO.getSurname());
                    foundEmployee.setName(employeeDTO.getName());
                    foundEmployee.setPatronymic(employeeDTO.getPatronymic());
                    foundEmployee.setStuffId(employeeDTO.getStuffId());
                    foundEmployee.setEmployeePost(employeeDTO.getEmployeePost());
                    foundEmployee.setRole(employeeDTO.getRole());
                    foundEmployee.setLogin(employeeDTO.getLogin());
                    foundEmployee.setPassword(employeeDTO.getPassword());
                    Employee updatedEmployee = employeeRepository.save(foundEmployee);
//                    return employeesMapper.entityToDto(updatedEmployee);
                    return EmployeeDto.builder()
                            .id(updatedEmployee.getId())
                            .surname(updatedEmployee.getSurname())
                            .name(updatedEmployee.getName())
                            .patronymic(updatedEmployee.getPatronymic())
                            .stuffId(updatedEmployee.getStuffId())
                            .employeePost(updatedEmployee.getEmployeePost())
                            .role(updatedEmployee.getRole())
                            .date(LocalDate.now())
                            .build();
                })
                .orElse(null);
    }

    public boolean deleteById(Long id) {
        if (employeeRepository.existsById(id)) {
            employeeRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public EmployeeWithEntryDto getEmployeeWithEntryById(Long id) {
        Employee employee = employeeRepository.findById(id).orElse(null);
        LogEntryDto logEntryDto = logEntryClient.getLogEntryById(id);
        return EmployeeWithEntryDto.builder()
                .id(employee.getId())
                .surname(employee.getSurname())
                .name(employee.getName())
                .patronymic(employee.getPatronymic())
                .stuffId(employee.getStuffId())
                .employeePost(employee.getEmployeePost())
                .role(employee.getRole())
                .logEntries(logEntryDto.logEntryList())
                .build();
    }
}
