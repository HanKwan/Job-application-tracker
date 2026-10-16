package com.han.backend.repository;

import com.han.backend.entity.Application;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ApplicationRepository extends JpaRepository<Application, Long> {

    List<Application> findAllByCompanyNameContainingIgnoreCase (
            String companyName
    );
}
