package com.example.localdrive;

import com.example.localdrive.configuration.FileStorageProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@EnableConfigurationProperties({FileStorageProperties.class})
@SpringBootApplication
public class LocalDriveApplication {

    public static void main(String[] args) {
        SpringApplication.run(LocalDriveApplication.class, args);
    }

}
