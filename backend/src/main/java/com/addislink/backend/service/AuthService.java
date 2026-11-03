
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
    private final JwtService jwtService;

    public AuthService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            JwtService jwtService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    @Transactional
    public User register(
            String fullName,
            String email,
            String phone,
            String rawPassword,
            String accountType,
            String businessName,
            String businessAddress,
            String businessCategory) {

        String normalizedEmail =
                email.trim().toLowerCase(Locale.ROOT);

        String normalizedPhone = phone.trim();

        String normalizedAccountType =
                accountType.trim().toUpperCase(Locale.ROOT);

        if (!normalizedAccountType.equals("BUYER")
                && !normalizedAccountType.equals("SUPPLIER")) {
            throw new IllegalArgumentException(
                    "Account type must be BUYER or SUPPLIER.");
        }

        if (userRepository.existsByEmailIgnoreCase(normalizedEmail)) {
            throw new IllegalArgumentException(
                    "An account with this email already exists.");
        }

        if (userRepository.existsByPhone(normalizedPhone)) {
            throw new IllegalArgumentException(
                    "An account with this phone number already exists.");
        }

        if (normalizedAccountType.equals("SUPPLIER")) {
            if (businessName == null || businessName.isBlank()
                    || businessAddress == null || businessAddress.isBlank()
                    || businessCategory == null || businessCategory.isBlank()) {
                throw new IllegalArgumentException(
                        "Supplier business information is required.");
            }
        }

        User user = new User();

        user.setFullName(fullName.trim());
        user.setEmail(normalizedEmail);
        user.setPhone(normalizedPhone);
        user.setPassword(passwordEncoder.encode(rawPassword));
        user.setRole("USER");
        user.setAccountType(normalizedAccountType);

        if (normalizedAccountType.equals("SUPPLIER")) {
            user.setBusinessName(businessName.trim());
            user.setBusinessAddress(businessAddress.trim());
            user.setBusinessCategory(businessCategory.trim());
        }

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

        if (!passwordEncoder.matches(
                rawPassword, user.getPassword())) {
            throw new IllegalArgumentException(
                    "Invalid email/phone or password.");
        }

        return user;
    }

    @Transactional(readOnly = true)
    public String loginAndGenerateToken(
            String identifier,
            String rawPassword) {

        User user = login(identifier, rawPassword);

        return jwtService.generateToken(
                user.getEmail(),
                user.getId(),
                user.getAccountType(),
                user.getRole()
        );
    }
}
