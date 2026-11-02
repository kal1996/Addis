
package com.addislink.backend.controller;

import com.addislink.backend.entity.Supplier;
import com.addislink.backend.repository.SupplierRepository;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/suppliers")
public class SupplierController {

    private final SupplierRepository supplierRepository;

    public SupplierController(SupplierRepository supplierRepository) {
        this.supplierRepository = supplierRepository;
    }

    @GetMapping
    public List<Supplier> getAllSuppliers() {
        return supplierRepository.findAll();
    }

    @PostMapping
    public org.springframework.http.ResponseEntity<?> createSupplier(
            @RequestBody Supplier supplier) {

        if (supplierRepository.existsByEmail(supplier.getEmail())) {
            return org.springframework.http.ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body(Map.of("error", "A supplier with this email already exists"));
        }

        Supplier savedSupplier = supplierRepository.save(supplier);

        return org.springframework.http.ResponseEntity
                .status(HttpStatus.CREATED)
                .body(savedSupplier);
    }
}
