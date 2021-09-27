package com.companypersonneljava.personnel.domain;

import lombok.*;

import javax.persistence.*;

@Table(name = "personnel")
@Entity
@Getter
@NoArgsConstructor
@ToString
public class Person {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id", nullable = false)
    private  Long id;
    @Column(name = "firstname", nullable = false)
    private  String firstName;
    @Column(name = "lastname", nullable = false)
    private  String lastName;
    @Column(name = "email", nullable = false)
    private  String email;
    @Column(name = "jobtitle", nullable = false)
    private  String jobTitle;
    @Column(name = "departmentID", nullable = false)
    private  Long departmentID;


}