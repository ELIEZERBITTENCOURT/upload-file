package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.model.UploadedFile;
import com.example.demo.service.FileStorageService;

@RestController
@RequestMapping("/files")
public class FileController {

    @Autowired
    private FileStorageService fileService;

    @PostMapping("/upload")
    public String uploadFile(@RequestParam("file") MultipartFile file) {
        try {
            UploadedFile savedFile = fileService.storeFile(file);
            return "Arquivo salvo com sucesso. ID: " + savedFile.getId();
        } catch (Exception e) {
            return "Erro ao salvar o arquivo: " + e.getMessage();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<byte[]> getFile(@PathVariable Long id) {
        UploadedFile file = fileService.getFile(id);

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getFileName() + "\"")
                .body(file.getData());
    }
}

