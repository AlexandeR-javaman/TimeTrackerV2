package com.example.employees_service.model;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "employees")
public class Employees {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "surname", nullable = false)
    private String surname;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "patronymic", nullable = false)
    private String patronymic;

    @Column(name = "stuffId", nullable = false)
    private int stuffId;

    @Column(name = "employeePost", nullable = false)
    private String employeePost;

    @Column(name = "role", nullable = false)
    private String role;

    @Column(name = "login", nullable = false)
    private String login;

    @Column(name = "password", nullable = false)
    private Integer password;

}
