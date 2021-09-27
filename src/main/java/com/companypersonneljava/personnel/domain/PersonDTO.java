package com.companypersonneljava.personnel.domain;


import lombok.*;

@Getter
@Setter

@ToString
public class PersonDTO {

    private  Long id;
    private Long departmentID;

    private  String firstName;
    private  String lastName;
    private  String jobTitle;
    private  String email;
    private  String departmentName;
    private  String locationName;


    public PersonDTO(Long id, Long departmentID, String firstName, String lastName, String jobTitle, String email, String departmentName, String locationName) {
        this.id = id;
        this.departmentID = departmentID;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.jobTitle = jobTitle;
        this.departmentName = departmentName;
        this.locationName = locationName;
    }

}
