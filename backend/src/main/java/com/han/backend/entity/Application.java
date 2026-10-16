package com.han.backend;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "applications")
public class Application {

    @Id
    @GeneratedValue
    private Long id;
    private String companyName;
    private String position;
    private String status;
    private String note;
    @Column(name = "application_date")
    private LocalDate applicationDate;

    public Application() {
    }

    public Application(Long id, String companyName, String position, String status, String note, LocalDate applicationDate) {
        this.id = id;
        this.companyName = companyName;
        this.position = position;
        this.status = status;
        this.note = note;
        this.applicationDate = applicationDate;
    }

    public Long getId() {
        return id;
    }

    public String getCompanyName() {
        return companyName;
    }

    public String getPosition() {
        return position;
    }

    public String getStatus() {
        return status;
    }

    public String getNote() {
        return note;
    }

    public LocalDate getApplicationDate() {
        return applicationDate;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public void setApplicationDate(LocalDate applicationDate) {
        this.applicationDate = applicationDate;
    }
}
