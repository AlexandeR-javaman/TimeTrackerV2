package com.example.employees_service.mapper;

import com.example.employees_service.model.Employees;
import com.example.employees_service.dto.EmployeesDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface EmployeesMapper {

    EmployeesDTO entityToDto(Employees employee);

//    @Mapping(target = "id", ignore = true)
//    Employees dtoToEntity(EmployeesCreateUpdateDTO employeesDto);

    List<EmployeesDTO> employeesListToEmployeeDtoList(List<Employees> employees);
}
