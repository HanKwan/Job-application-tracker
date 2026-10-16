package com.han.backend;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ApplicationRepository extends JpaRepository<Application, Long> {

    List<Application> findAllByCompanyNameContainingIgnoreCase (
            String companyName
    );
}
