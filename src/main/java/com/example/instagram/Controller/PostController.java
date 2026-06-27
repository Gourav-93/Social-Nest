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

    @Autowired
    private com.example.instagram.Repository.UserRepository userRepository;

    @GetMapping("/api/post")
    @CrossOrigin("*")
    public List<com.example.instagram.Dto.PostDTO> getPosts() {
        List<PostModel> posts = postRepository.findAll();
        List<com.example.instagram.Dto.PostDTO> postDTOs = new java.util.ArrayList<>();
        
        for (PostModel post : posts) {
            com.example.instagram.Dto.PostDTO dto = new com.example.instagram.Dto.PostDTO();
            dto.setId(post.getId());
            dto.setPic(post.getPic());
            dto.setCaption(post.getCaption());
            dto.setUserId(post.getUserId());
            
            if (post.getUserId() != null) {
                com.example.instagram.Model.UserModel user = userRepository.findById(post.getUserId()).orElse(null);
                if (user != null) {
                    dto.setAuthorName(user.getFullName());
                    dto.setUserProfileImage(user.getAvatar());
                }
            }
            postDTOs.add(dto);
        }
        return postDTOs;
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
