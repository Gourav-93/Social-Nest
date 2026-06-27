package com.example.instagram.Controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.instagram.Dto.LoginModel;
import com.example.instagram.Model.UserModel;
import com.example.instagram.Repository.UserRepository;

@RestController
@CrossOrigin("*")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/api/user/register")
    public Map<String, String> register(@RequestBody UserModel user) {
        userRepository.save(user);
        Map<String, String> response = new HashMap<>();
        response.put("message", "success");
        return response;
    }

    @PostMapping("/api/user/login")
    public Map<String, Object> login(@RequestBody LoginModel user) {
        List<UserModel> allUsers = userRepository.findAll();
        Map<String, Object> response = new HashMap<>();

        for (int i = 0; i < allUsers.size(); i++) {
            UserModel u = allUsers.get(i);
            if (u.getEmail().equals(user.getemail()) && u.getPassword().equals(user.getPassword())) {
                response.put("message", "success");
                response.put("user", u);
                return response;
            }
        }

        response.put("message", "fail");
        return response;
    }

}
