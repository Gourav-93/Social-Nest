package com.example.instagram.Controller;

import java.util.List;

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
    @CrossOrigin("*")

    public List<PostModel> getPosts() {
        return postRepository.findAll();
    }

    @PostMapping("/api/post")
    @CrossOrigin("*")

    public java.util.Map<String, String> addPost(@RequestBody PostModel post)
    {
        postRepository.save(post);
        java.util.Map<String, String> response = new java.util.HashMap<>();
        response.put("message", "success");
        return response;
    }

}
