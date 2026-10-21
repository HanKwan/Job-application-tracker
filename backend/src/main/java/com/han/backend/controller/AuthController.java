package com.han.backend.controller;


import com.han.backend.dto.LoginRequest;
import com.han.backend.dto.RegisterRequest;
import com.han.backend.entity.User;
import com.han.backend.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthController(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/register")
    public String register(@RequestBody RegisterRequest request) {
        String email = request.getEmail();
        String password = request.getPassword();

        if (userRepository.findByEmail(email).isPresent()) {
            return "This email is already registered.";
        }

        String hashedPassword = passwordEncoder.encode(password);
        User user = new User(email, hashedPassword);

        userRepository.save(user);

        return "Registration successful.";
    }


    @PostMapping("/login")
    public String login(@RequestBody LoginRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElse(null);

        if (user == null) {
            return "Email or password is incorrect.";
        }

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            return "Email or password is incorrect.";
        }

        return "Login successful.";
    }
}