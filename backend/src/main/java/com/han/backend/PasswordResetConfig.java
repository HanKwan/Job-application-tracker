
package com.han.backend;

import com.han.backend.entity.User;
import com.han.backend.repository.UserRepository;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class PasswordResetConfig {

    @Bean
    CommandLineRunner resetPasswords(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder) {

        return args -> {

            // Reset User 1
            User user1 = userRepository.findById(1L)
                    .orElseThrow(() ->
                            new RuntimeException("User 1 not found"));

            user1.setPassword(
                    passwordEncoder.encode("testuser123")
            );

            userRepository.save(user1);

            // Reset User 2
            User user2 = userRepository.findById(2L)
                    .orElseThrow(() ->
                            new RuntimeException("User 2 not found"));

            user2.setPassword(
                    passwordEncoder.encode("hanuser123")
            );

            userRepository.save(user2);

            System.out.println("Both user passwords reset successfully!");
        };
    }
}