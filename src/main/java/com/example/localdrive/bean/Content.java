package com.example.localdrive.bean;

import java.util.ArrayList;

public class Content {

    private ArrayList<String> files;
    private ArrayList<String> folders;

    public Content() {
        files = new ArrayList<>();
        folders = new ArrayList<>();
    }

    public Content(ArrayList<String> files, ArrayList<String> folders) {
        this.files = files;
        this.folders = folders;
    }

    public ArrayList<String> getFiles() {
        return files;
    }

    public void setFiles(ArrayList<String> files) {
        this.files = files;
    }

    public ArrayList<String> getFolders() {
        return folders;
    }

    public void setFolders(ArrayList<String> folders) {
        this.folders = folders;
    }

    public void addFile(String file){
        files.add(file);
    }

    public void addFolder(String folder){
        folders.add(folder);
    }

    @Override
    public String toString() {
        return "Content{" +
                "files=" + files +
                ", folders=" + folders +
                '}';
    }
}
