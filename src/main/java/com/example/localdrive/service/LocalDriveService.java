package com.example.localdrive.service;

import com.example.localdrive.bean.Content;
import com.example.localdrive.bean.LocalDrive;
import com.example.localdrive.configuration.FileStorageProperties;
import org.apache.commons.io.FileUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.File;
import java.io.IOException;

@Service
public class LocalDriveService {

    protected FileStorageProperties fileStorageProperties;

    public LocalDriveService(FileStorageProperties fileStorageProperties) {
        this.fileStorageProperties = fileStorageProperties;
    }

    public LocalDrive doListing(String filePath) {
        File mainDirectory;
        String fileWExtension;

        Content content = new Content();
        LocalDrive localDrive = new LocalDrive();

        if (filePath.equals("/")) {
            localDrive.setPath(filePath);
            mainDirectory = new File(fileStorageProperties.getUploadDir());
        } else {
            localDrive.setPath(filePath);
            mainDirectory = new File(fileStorageProperties.getUploadDir() + "/" + filePath);
        }

        File[] fileList = mainDirectory.listFiles();

        if (fileList != null) {
            for (File file : fileList) {
                if (file.isFile()) {
                    fileWExtension = file.getName();
                    content.addFile(fileWExtension);
                }
                if (file.isDirectory()) {
                    content.addFolder(file.getName());
                }
            }
        }

        localDrive.setContent(content);

        return localDrive;
    }

    public void createNewFile(String requestUri, MultipartFile file) {

        String fileName = file.getOriginalFilename();
        String destinyFilePath = getComposedPath(requestUri, fileName);
        File newFile = new File(destinyFilePath);

        // Write bytes from the multipart file to disk.
        try {
            FileUtils.writeByteArrayToFile(newFile, file.getBytes());
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public boolean createNewFolder(String requestUri, String folderName) {

        String destinyFilePath = getComposedPath(requestUri, folderName);
        File newFile = new File(destinyFilePath);

        return newFile.mkdirs();
    }

    public String getComposedPath(String requestUri, String name) {
        String destinyPath = "";

        if (!requestUri.equals("/"))
            destinyPath = getLocalDrivePath() + "/" + requestUri + "/" + name;
        else
            destinyPath = getLocalDrivePath() + "/" + name;

        return destinyPath;
    }

    public String getLocalDrivePath() {
        return fileStorageProperties.getUploadDir();
    }
}
