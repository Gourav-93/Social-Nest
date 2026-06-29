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
import com.example.instagram.Model.UserModel;
import com.example.instagram.Repository.PostRepository;
import com.example.instagram.Repository.UserRepository;

@RestController
@CrossOrigin("*")
public class PostController {

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/api/post")
    public Map<String, Object> getPosts() {

        List<PostModel> posts = postRepository.findAll();

        for (PostModel post : posts) {

            if (post.getUserId() != null) {

                UserModel user = userRepository.findById(post.getUserId()).orElse(null);

                if (user != null) {
                    post.setUserName(user.getFullName());
                } else {
                    post.setUserName("Unknown User");
                }

            } else {
                post.setUserName("Unknown User");
            }
        }
        
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("posts", posts);
        
        return response;
    }


    @PostMapping("/api/post")
    public Map<String, String> addPost(@RequestBody PostModel post) {
        postRepository.save(post);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Success");
        return response;
    }
}