package com.example.localdrive.controller;

import com.example.localdrive.bean.LocalDrive;
import com.example.localdrive.service.LocalDriveService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;

@RestController
class LocalDriveController {

    private LocalDriveService localDriveService;

    public LocalDriveController(LocalDriveService localDriveService) {
        this.localDriveService = localDriveService;
    }

    @GetMapping("/**")
    public LocalDrive getValues(HttpServletRequest request) {
        String requestUri = request.getRequestURI();
        LocalDrive localDrive = localDriveService.doListing(requestUri);

        return localDrive;
    }

    @PostMapping(value = "/**/upload")
    public void uploadFile(@RequestParam("file") MultipartFile file, HttpServletRequest request) {
        String requestUri = request.getRequestURI().replace("upload", "");
        localDriveService.createNewFile(requestUri, file);
    }

    @PostMapping("/**/create")
    public void createFolder(@RequestBody String name, HttpServletRequest request) {
        String path = request.getRequestURI().replace("/create", "");
        localDriveService.createNewFolder(path, name);
    }
}
