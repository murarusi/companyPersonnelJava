package com.companypersonneljava.personnel.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@Getter
@ToString
@Table(name = "departments")
public class Department {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id", nullable = false)
    private  Long id;
    @Column(name = "name", nullable = false)
    private  String name;
    @Column(name = "locationID", nullable = false)
    private  Long locationID;


}
