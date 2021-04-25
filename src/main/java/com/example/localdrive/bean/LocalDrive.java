package com.example.localdrive.bean;

public class LocalDrive {

    private String path;
    private Content content;

    public LocalDrive() {}

    public LocalDrive(String path) {
        this.path = path;
    }

    public LocalDrive(String path, Content content) {
        this.path = path;
        this.content = content;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public Content getContent() {
        return content;
    }

    public void setContent(Content content) {
        this.content = content;
    }

    @Override
    public String toString() {
        return "LocalDrive{" +
                "path='" + path + '\'' +
                ", content=" + content +
                '}';
    }
}
