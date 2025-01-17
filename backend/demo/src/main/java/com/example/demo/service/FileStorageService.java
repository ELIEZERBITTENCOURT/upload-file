package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.model.UploadedFile;
import com.example.demo.repository.UploadedFileRepository;

import java.io.IOException;

@Service
public class FileStorageService {

    @Autowired
    private UploadedFileRepository fileRepository;

    public UploadedFile storeFile(MultipartFile file) throws IOException {
        UploadedFile uploadedFile = new UploadedFile();
        uploadedFile.setFileName(file.getOriginalFilename());
        uploadedFile.setFileType(file.getContentType());
        uploadedFile.setFileSize(file.getSize());
        uploadedFile.setData(file.getBytes());

        return fileRepository.save(uploadedFile);
    }

    public UploadedFile getFile(Long fileId) {
        return fileRepository.findById(fileId)
                .orElseThrow(() -> new RuntimeException("Arquivo não encontrado com id: " + fileId));
    }
}

