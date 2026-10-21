package com.han.backend.controller;


import com.han.backend.dto.LoginRequest;
import com.han.backend.dto.RegisterRequest;
import com.han.backend.entity.User;
import com.han.backend.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.security.web.context.SecurityContextRepository;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final SecurityContextRepository securityContextRepository = new HttpSessionSecurityContextRepository();

    public AuthController(UserRepository userRepository,
                          PasswordEncoder passwordEncoder,
                          AuthenticationManager authenticationManager) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
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
    public String login(@RequestBody LoginRequest request,
                        HttpServletRequest httpRequest,
                        HttpServletResponse httpResponse) {

        // login checks user and pw through AuthManager
        // and hold the result of successful credential verification
        Authentication authentication =
                authenticationManager.authenticate(
                        new UsernamePasswordAuthenticationToken(
                                request.getEmail(),
                                request.getPassword()
                        )
                );

        // hold the authenticated user's identity for spring security
        SecurityContext context = SecurityContextHolder.createEmptyContext();

        context.setAuthentication(authentication);
        SecurityContextHolder.setContext(context);  // makes that context available during the current request.

        securityContextRepository.saveContext(
                context, httpRequest, httpResponse
        );

        return "Login successful.";
    }
}