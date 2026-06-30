package com.aziz.Notes.app.Entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.time.LocalDateTime;

    @Entity
    @Table(name = "notes")
    public class Note {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        @NotBlank(message = "Le titre est obligatoire")
        @Size(max = 120, message = "Le titre ne doit pas dépasser 120 caractères")
        @Column(nullable = false, length = 120)
        private String title;

        @Size(max = 5000, message = "Le contenu ne doit pas dépasser 5000 caractères")
        @Column(columnDefinition = "TEXT")
        private String content;

        @Column(nullable = false, updatable = false)
        private LocalDateTime createdAt;

        @Column(nullable = false)
        private LocalDateTime updatedAt;

        public Note() {
        }

        public Note(String title, String content) {
            this.title = title;
            this.content = content;
        }

        @PrePersist
        public void onCreate() {
            LocalDateTime currentDate = LocalDateTime.now();
            this.createdAt = currentDate;
            this.updatedAt = currentDate;
        }

        @PreUpdate
        public void onUpdate() {
            this.updatedAt = LocalDateTime.now();
        }

        public Long getId() {
            return id;
        }

        public void setId(Long id) {
            this.id = id;
        }

        public String getTitle() {
            return title;
        }

        public void setTitle(String title) {
            this.title = title;
        }

        public String getContent() {
            return content;
        }

        public void setContent(String content) {
            this.content = content;
        }

        public LocalDateTime getCreatedAt() {
            return createdAt;
        }

        public LocalDateTime getUpdatedAt() {
            return updatedAt;
        }
    }

