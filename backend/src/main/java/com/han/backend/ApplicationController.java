package com.han.backend;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/applications")
public class ApplicationController {

    private ApplicationRepository applicationRepository;

    public ApplicationController(ApplicationRepository applicationRepository) {
        this.applicationRepository = applicationRepository;
    }

    @GetMapping
    public List<Application> findAll() {
        return applicationRepository.findAll();
    }

    @PostMapping
    public Application save(@RequestBody Application application) {
        return applicationRepository.save(application);
    }

    @GetMapping("/search/{id}")
    public Application findById(@PathVariable Long id) {
        return applicationRepository.findById(id).orElse(null);
    }
}
