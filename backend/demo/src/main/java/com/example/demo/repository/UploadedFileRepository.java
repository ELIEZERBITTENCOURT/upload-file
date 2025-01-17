package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.model.UploadedFile;

public interface UploadedFileRepository extends JpaRepository<UploadedFile, Long> {
}

