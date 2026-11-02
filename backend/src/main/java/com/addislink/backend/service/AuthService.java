
package com.addislink.backend.service;

import com.addislink.backend.entity.User;
import com.addislink.backend.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Locale;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    public User register(
            String fullName,
            String email,
            String phone,
            String rawPassword) {

        String normalizedEmail = email.trim().toLowerCase(Locale.ROOT);
        String normalizedPhone = phone.trim();

        if (userRepository.existsByEmailIgnoreCase(normalizedEmail)) {
            throw new IllegalArgumentException(
                    "An account with this email already exists.");
        }

        if (userRepository.existsByPhone(normalizedPhone)) {
            throw new IllegalArgumentException(
                    "An account with this phone number already exists.");
        }

        User user = new User();
        user.setFullName(fullName.trim());
        user.setEmail(normalizedEmail);
        user.setPhone(normalizedPhone);

        // Never save a plain-text password.
        user.setPassword(passwordEncoder.encode(rawPassword));

        user.setRole("USER");

        return userRepository.save(user);
    }

    @Transactional(readOnly = true)
    public User login(String identifier, String rawPassword) {
        String value = identifier.trim();

        User user = value.contains("@")
                ? userRepository.findByEmailIgnoreCase(value)
                    .orElseThrow(() -> new IllegalArgumentException(
                            "Invalid email/phone or password."))
                : userRepository.findByPhone(value)
                    .orElseThrow(() -> new IllegalArgumentException(
                            "Invalid email/phone or password."));

        if (!passwordEncoder.matches(rawPassword, user.getPassword())) {
            throw new IllegalArgumentException(
                    "Invalid email/phone or password.");
        }

        return user;
    }
}
