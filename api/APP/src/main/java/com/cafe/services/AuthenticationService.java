package com.cafe.services;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.cafe.dto.LoginUserDto;
import com.cafe.dto.RegisterUserDto;
import com.cafe.entity.Customer;
import com.cafe.repository.CustomerRepository;

@Service
public class AuthenticationService {
    private final CustomerRepository userRepository;
    
    private final PasswordEncoder passwordEncoder;
    
    private final AuthenticationManager authenticationManager;

    public AuthenticationService(
       CustomerRepository userRepository,
        AuthenticationManager authenticationManager,
        PasswordEncoder passwordEncoder
    ) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

   public ResponseEntity<?> signup(RegisterUserDto input) {
    // Check if a user with the provided email already exists
    Optional<Customer> existingUser = userRepository.findByEmail(input.getEmail());
    
    if (existingUser.isPresent()) {
        // Return a BAD_REQUEST response if the email is already taken
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                             .body("Email is already in use.");
    }

    try {
        // Create a new user and encode the password
        Customer user = new Customer()
                .setEmail(input.getEmail())
                .setPassword(passwordEncoder.encode(input.getPassword()));

        // Save the user in the repository
        Customer savedUser = userRepository.save(user);

        // Return the saved user and a 201 CREATED status on success
        return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);

    } catch (Exception e) {
        // Catch any exceptions that occur and return a server error response
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                             .body("An error occurred during registration: " + e.getMessage());
    }
}


    public Customer authenticate(LoginUserDto input) {
        try {
            authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                    input.getEmail(),
                    input.getPassword()
                )
            );
        } catch (Exception ex) {
            throw new RuntimeException("Invalid credentials provided", ex);  // Add more context to the exception
        }
    
        return userRepository.findByEmail(input.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
}