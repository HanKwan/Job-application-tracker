package com.han.backend.controller;


import com.han.backend.dto.RegisterRequest;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {



    @PostMapping("/register")
    public String register(@RequestBody RegisterRequest request) {
        String email = request.getEmail();
        String password = request.getPassword();

        return "Registration endpoint reached";
    }

}
