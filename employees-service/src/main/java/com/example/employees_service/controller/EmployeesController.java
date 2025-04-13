package com.example.employees_service.controller;

import com.example.employees_service.dto.EmployeeCreateUpdateDTO;
import com.example.employees_service.dto.EmployeesDTO;
import com.example.employees_service.service.EmployeesService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("employees")
public class EmployeesController {

    private final EmployeesService employeesService;

    public EmployeesController(EmployeesService employeesService) {
        this.employeesService = employeesService;
    }

    @GetMapping()
    public ResponseEntity<List<EmployeesDTO>> getAllEmployees() {
        List<EmployeesDTO> employeeDtoList = employeesService.findAll();
        return ResponseEntity.ok().body(employeeDtoList);
    }

    @GetMapping("/{id}")
    public ResponseEntity<EmployeesDTO> getEmployeeById(@PathVariable Long id) {
        Optional<EmployeesDTO> employeeDto = employeesService.findById(id);
        return employeeDto.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @PostMapping()
    public ResponseEntity<EmployeesDTO> createEmployee(@RequestBody EmployeeCreateUpdateDTO createEmployeeDTO) {
        EmployeesDTO createdEmployee = employeesService.save(createEmployeeDTO);
        return new ResponseEntity<>(createdEmployee, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<EmployeesDTO> updateEmployee(@RequestBody EmployeeCreateUpdateDTO updateEmployeeDTO,
                                                       @PathVariable Long id) {
        EmployeesDTO updatedEmployee = employeesService.update(updateEmployeeDTO, id);
        return updatedEmployee != null ? ResponseEntity.ok(updatedEmployee) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEmployee(@PathVariable Long id) {
        return employeesService.deleteById(id) ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }

}
