package com.example.instagram.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.instagram.Model.PostModel;

public interface PostRepository extends JpaRepository<PostModel, Long> {
    
}
