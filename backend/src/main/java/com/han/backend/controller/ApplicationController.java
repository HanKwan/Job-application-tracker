package com.han.backend.controller;

import com.han.backend.entity.Application;
import com.han.backend.entity.User;
import com.han.backend.repository.ApplicationRepository;
import com.han.backend.repository.UserRepository;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/applications")
public class ApplicationController {

    private final ApplicationRepository applicationRepository;
    private final UserRepository userRepository;

    public ApplicationController(
            ApplicationRepository applicationRepository,
            UserRepository userRepository) {

        this.applicationRepository = applicationRepository;
        this.userRepository = userRepository;
    }

    // Get the currently authenticated user
    private User getCurrentUser(Authentication authentication) {

        return userRepository.findByEmail(authentication.getName())
                .orElseThrow(() ->
                        new ResponseStatusException(
                                HttpStatus.UNAUTHORIZED,
                                "User not found"
                        ));
    }

    // Retrieve all applications belonging to the logged-in user
    @GetMapping
    public List<Application> findAll(Authentication authentication) {

        User user = getCurrentUser(authentication);

        return applicationRepository.findAllByUser_IdOrderByIdAsc(user.getId());
    }

    // Create a new application under the logged-in user
    @PostMapping
    public Application addNewApplication(
            @RequestBody Application application,
            Authentication authentication) {

        User user = getCurrentUser(authentication);

        application.setUser(user);

        return applicationRepository.save(application);
    }

    // Find an application by ID, provided it belongs to the logged-in user
    @GetMapping("/search/{id}")
    public Application findCompanyById(
            @PathVariable Long id,
            Authentication authentication) {

        User user = getCurrentUser(authentication);

        return applicationRepository.findByIdAndUser_Id(id, user.getId())
                .orElseThrow(() ->
                        new ResponseStatusException(
                                HttpStatus.NOT_FOUND,
                                "Application not found"
                        ));
    }

    // Search applications belonging to the logged-in user
    @GetMapping("/search")
    public List<Application> findByCompanyName(
            @RequestParam String companyName,
            Authentication authentication) {

        User user = getCurrentUser(authentication);

        return applicationRepository
                .findAllByUser_IdAndCompanyNameContainingIgnoreCaseOrderByIdAsc(
                        user.getId(),
                        companyName
                );
    }

    // Update an application belonging to the logged-in user
    @PutMapping("/{id}")
    public Application updateApplication(
            @PathVariable Long id,
            @RequestBody Application updateApplication,
            Authentication authentication) {

        User user = getCurrentUser(authentication);

        Application existing = applicationRepository
                .findByIdAndUser_Id(id, user.getId())
                .orElseThrow(() ->
                        new ResponseStatusException(
                                HttpStatus.NOT_FOUND,
                                "Application not found"
                        ));

        existing.setCompanyName(updateApplication.getCompanyName());
        existing.setPosition(updateApplication.getPosition());
        existing.setStatus(updateApplication.getStatus());
        existing.setNote(updateApplication.getNote());
        existing.setApplicationDate(updateApplication.getApplicationDate());

        return applicationRepository.save(existing);
    }

    // Delete an application belonging to the logged-in user
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteApplication(
            @PathVariable Long id,
            Authentication authentication) {

        User user = getCurrentUser(authentication);

        Application existing = applicationRepository
                .findByIdAndUser_Id(id, user.getId())
                .orElseThrow(() ->
                        new ResponseStatusException(
                                HttpStatus.NOT_FOUND,
                                "Application not found"
                        ));

        applicationRepository.delete(existing);
    }
}