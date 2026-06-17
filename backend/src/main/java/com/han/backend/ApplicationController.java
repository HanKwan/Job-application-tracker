package com.han.backend;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")     // localhost in react when npm run dev
@RestController
@RequestMapping("/api/applications")
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
    public Application addNewApplication(@RequestBody Application application) {
        System.out.println(application.getApplicationDate());
        return applicationRepository.save(application);
    }

    @GetMapping("/search/{id}")
    public Application findCompanyById(@PathVariable Long id) {
        return applicationRepository.findById(id).orElse(null);
    }

    @GetMapping("/search")
    public List<Application> findByCompanyName(@RequestParam String companyName) {
        return applicationRepository.findAllByCompanyNameContainingIgnoreCase(companyName);
    }

    @PutMapping("/{id}")
    public Application updateApplication(
            @PathVariable Long id,
            @RequestBody Application updateApplication) {

        Application existing = applicationRepository.findById(id).orElseThrow(null);

        existing.setCompanyName(updateApplication.getCompanyName());
        existing.setPosition(updateApplication.getPosition());
        existing.setStatus(updateApplication.getStatus());
        existing.setNote(updateApplication.getNote());
        existing.setApplicationDate(updateApplication.getApplicationDate());

        return applicationRepository.save(existing);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteApplication(@PathVariable Long id) {
        applicationRepository.deleteById(id);
    }
}
