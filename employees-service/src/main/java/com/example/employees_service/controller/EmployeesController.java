package com.example.employees_service.controller;

import com.example.employees_service.dto.EmployeeCreateUpdateDto;
import com.example.employees_service.dto.EmployeeDto;
import com.example.employees_service.service.EmployeeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/employees")
public class EmployeesController {

    private final EmployeeService employeeService;

    public EmployeesController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @GetMapping()
    public ResponseEntity<List<EmployeeDto>> getAllEmployees() {
        List<EmployeeDto> employeeDtoList = employeeService.findAll();
        return ResponseEntity.ok().body(employeeDtoList);
    }

    @GetMapping("/{id}")
    public ResponseEntity<EmployeeDto> getEmployeeById(@PathVariable Long id) {
        Optional<EmployeeDto> employeeDto = employeeService.findById(id);
        return employeeDto.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @PostMapping()
    public ResponseEntity<EmployeeDto> createEmployee(@RequestBody EmployeeCreateUpdateDto createEmployeeDTO) {
        EmployeeDto createdEmployee = employeeService.save(createEmployeeDTO);
        return new ResponseEntity<>(createdEmployee, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<EmployeeDto> updateEmployee(@RequestBody EmployeeCreateUpdateDto updateEmployeeDTO,
                                                      @PathVariable Long id) {
        EmployeeDto updatedEmployee = employeeService.update(updateEmployeeDTO, id);
        return updatedEmployee != null ? ResponseEntity.ok(updatedEmployee) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEmployee(@PathVariable Long id) {
        return employeeService.deleteById(id) ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }

}
