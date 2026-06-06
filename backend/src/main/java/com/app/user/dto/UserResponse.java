package com.app.user.dto;

import com.app.user.entity.User;
import lombok.Builder;
import lombok.Data;
import java.time.LocalDateTime;

@Data @Builder
public class UserResponse {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String role;
    private LocalDateTime createdAt;

    public static UserResponse from(User user) {
        return UserResponse.builder()
            .id(user.getId()).firstName(user.getFirstName())
            .lastName(user.getLastName()).email(user.getEmail())
            .role(user.getRole().name()).createdAt(user.getCreatedAt())
            .build();
    }
}