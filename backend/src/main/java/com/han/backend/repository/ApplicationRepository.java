package com.han.backend.repository;

import com.han.backend.entity.Application;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ApplicationRepository extends JpaRepository<Application, Long> {

    // Retrieve applications belonging to a specific user
    List<Application> findAllByUser_IdOrderByIdAsc(Long userId);

    // Search applications belonging to a specific user
    List<Application> findAllByUser_IdAndCompanyNameContainingIgnoreCaseOrderByIdAsc(
            Long userId,
            String companyName
    );

    // Find a specific application only if it belongs to that user
    Optional<Application> findByIdAndUser_Id(Long id, Long userId);

    // Existing method - temporarily retained for the current controller
    List<Application> findAllByCompanyNameContainingIgnoreCase(String companyName);
}
