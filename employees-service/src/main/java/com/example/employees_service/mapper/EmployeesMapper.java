package com.example.employees_service.mapper;

import com.example.employees_service.dto.EmployeeCreateUpdateDto;
import com.example.employees_service.dto.EmployeeDto;
import com.example.employees_service.model.Employee;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface EmployeesMapper {

    EmployeeDto entityToDto(Employee employee);

    @Mapping(target = "id", ignore = true)
    Employee dtoToEntity(EmployeeCreateUpdateDto createEmployeeDTO);

    List<EmployeeDto> employeesListToEmployeesDTOList(List<Employee> employees);
}
