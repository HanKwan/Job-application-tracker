package com.han.backend;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

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

    public Application() {
    }

    public Application(Long id, String companyName, String position, String status, String note) {
        this.id = id;
        this.companyName = companyName;
        this.position = position;
        this.status = status;
        this.note = note;
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
}
