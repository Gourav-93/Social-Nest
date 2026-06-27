package com.example.instagram.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.instagram.Model.UserModel;

public interface UserRepository extends JpaRepository<UserModel, Long> {
    
}
