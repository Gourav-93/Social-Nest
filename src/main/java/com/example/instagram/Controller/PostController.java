package com.example.instagram.Controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.instagram.Model.PostModel;
import com.example.instagram.Repository.PostRepository;

@RestController
@CrossOrigin("*")
public class PostController {

    @Autowired
    private PostRepository postRepository;

    @GetMapping("/api/post")
    public List<PostModel> getPosts() {
        return postRepository.findAll();
    }

    @PostMapping("/api/post")
    public Map<String, String> addPost(@RequestBody PostModel post) {

        postRepository.save(post);

        Map<String, String> response = new HashMap<>();
        response.put("message", "Success");

        return response;
    }
}