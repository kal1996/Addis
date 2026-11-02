
package com.addislink.backend.controller;

import com.addislink.backend.entity.User;
import com.addislink.backend.service.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    public record RegisterRequest(
            String fullName,
            String email,
            String phone,
            String password) {
    }

    public record LoginRequest(
            String identifier,
            String password) {
    }

    public record AuthResponse(
            Long id,
            String fullName,
            String email,
            String phone,
            String role) {
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(
            @RequestBody RegisterRequest request) {
        try {
            if (request.fullName() == null
                    || request.email() == null
                    || request.phone() == null
                    || request.password() == null
                    || request.fullName().isBlank()
                    || request.email().isBlank()
                    || request.phone().isBlank()
                    || request.password().isBlank()) {
                return ResponseEntity.badRequest()
                        .body(Map.of("message",
                                "All fields are required."));
            }

            User user = authService.register(
                    request.fullName(),
                    request.email(),
                    request.phone(),
                    request.password());

            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(toResponse(user));

        } catch (IllegalArgumentException ex) {
            return ResponseEntity.badRequest()
                    .body(Map.of("message", ex.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestBody LoginRequest request) {
        try {
            if (request.identifier() == null
                    || request.password() == null
                    || request.identifier().isBlank()
                    || request.password().isBlank()) {
                return ResponseEntity.badRequest()
                        .body(Map.of("message",
                                "Email/phone and password are required."));
            }

            User user = authService.login(
                    request.identifier(),
                    request.password());

            return ResponseEntity.ok(toResponse(user));

        } catch (IllegalArgumentException ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("message",
                            "Invalid email/phone or password."));
        }
    }

    private AuthResponse toResponse(User user) {
        return new AuthResponse(
                user.getId(),
                user.getFullName(),
                user.getEmail(),
                user.getPhone(),
                user.getRole());
    }
}
