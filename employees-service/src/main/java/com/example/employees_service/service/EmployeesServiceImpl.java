package com.example.employees_service.service;

import com.example.employees_service.dto.EmployeeCreateUpdateDTO;
import com.example.employees_service.dto.EmployeesDTO;
import com.example.employees_service.mapper.EmployeesMapper;
import com.example.employees_service.model.Employees;
import com.example.employees_service.repository.EmployeesRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
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
                        .surname(employees.getSurname())
                        .name(employees.getName())
                        .patronymic(employees.getPatronymic())
                        .stuffId(employees.getStuffId())
                        .employeePost(employees.getEmployeePost())
                        .role(employees.getRole())
                        .date(LocalDate.now())
                        .build())
                .collect(Collectors.toList());
    }
    @Override
    public Optional<EmployeesDTO> findById(Long id) {
//        return employeesRepository.findById(id)       // если надо через маппер
//                .map(employeesMapper::entityToDto);  // если надо через маппер
        return employeesRepository.findById(id)
                .map(employees -> EmployeesDTO.builder()
                        .id(employees.getId())
                        .surname(employees.getSurname())
                        .name(employees.getName())
                        .patronymic(employees.getPatronymic())
                        .stuffId(employees.getStuffId())
                        .employeePost(employees.getEmployeePost())
                        .role(employees.getRole())
                        .date(LocalDate.now())
                        .build());
    }
    @Override
    public EmployeesDTO save(EmployeeCreateUpdateDTO createEmployeeDTO) {
//        Employees employee = employeesMapper.dtoToEntity(createEmployeeDTO); // если через маппер, но не будет даты
        Employees employee = Employees.builder()
                .surname(createEmployeeDTO.getSurname())
                .name(createEmployeeDTO.getName())
                .patronymic(createEmployeeDTO.getPatronymic())
                .stuffId(createEmployeeDTO.getStuffId())
                .employeePost(createEmployeeDTO.getEmployeePost())
                .role(createEmployeeDTO.getRole())
                .login(createEmployeeDTO.getLogin())
                .password(createEmployeeDTO.getPassword())
                .build();
        Employees savedEmployee = employeesRepository.save(employee);
//        return employeesMapper.entityToDto(savedEmployee); // если через маппер, но не будет даты
        return EmployeesDTO.builder()
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
    @Override
    public EmployeesDTO update(EmployeeCreateUpdateDTO employeeDTO, Long id) {
        return employeesRepository.findById(id)
                .map(foundEmployee -> {
                    foundEmployee.setSurname(employeeDTO.getSurname());
                    foundEmployee.setName(employeeDTO.getName());
                    foundEmployee.setPatronymic(employeeDTO.getPatronymic());
                    foundEmployee.setStuffId(employeeDTO.getStuffId());
                    foundEmployee.setEmployeePost(employeeDTO.getEmployeePost());
                    foundEmployee.setRole(employeeDTO.getRole());
                    foundEmployee.setLogin(employeeDTO.getLogin());
                    foundEmployee.setPassword(employeeDTO.getPassword());
                    Employees updatedEmployee = employeesRepository.save(foundEmployee);
                    return employeesMapper.entityToDto(updatedEmployee);
                })
                .orElse(null);
    }

    @Override
    public boolean deleteById(Long id) {
        if (employeesRepository.existsById(id)) {
            employeesRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
