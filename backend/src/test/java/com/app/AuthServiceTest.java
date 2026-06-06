package com.app;

import com.app.auth.*;
import com.app.user.entity.Role;
import com.app.user.entity.User;
import com.app.user.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import java.util.Optional;
import static org.assertj.core.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AuthServiceTest {

    @Mock private UserRepository userRepository;
    @Mock private PasswordEncoder passwordEncoder;
    @Mock private JwtService jwtService;
    @Mock private AuthenticationManager authenticationManager;
    @InjectMocks private AuthService authService;

    private RegisterRequest registerRequest;

    @BeforeEach
    void setUp() {
        registerRequest = new RegisterRequest();
        registerRequest.setFirstName("Mahesh");
        registerRequest.setLastName("Patluri");
        registerRequest.setEmail("mahesh@example.com");
        registerRequest.setPassword("password123");
    }

    @Test
    void register_Success() {
        when(userRepository.existsByEmail("mahesh@example.com")).thenReturn(false);
        when(passwordEncoder.encode(anyString())).thenReturn("encodedPassword");
        User savedUser = User.builder().id(1L).firstName("Mahesh").lastName("Patluri")
            .email("mahesh@example.com").password("encodedPassword").role(Role.ROLE_USER).build();
        when(userRepository.save(any(User.class))).thenReturn(savedUser);
        when(jwtService.generateToken(any())).thenReturn("jwt-token");

        AuthResponse response = authService.register(registerRequest);

        assertThat(response.getToken()).isEqualTo("jwt-token");
        assertThat(response.getEmail()).isEqualTo("mahesh@example.com");
        assertThat(response.getRole()).isEqualTo("ROLE_USER");
    }

    @Test
    void register_DuplicateEmail_ThrowsException() {
        when(userRepository.existsByEmail("mahesh@example.com")).thenReturn(true);
        assertThatThrownBy(() -> authService.register(registerRequest))
            .isInstanceOf(IllegalStateException.class)
            .hasMessageContaining("already registered");
    }

    @Test
    void login_Success() {
        LoginRequest loginRequest = new LoginRequest();
        loginRequest.setEmail("mahesh@example.com");
        loginRequest.setPassword("password123");

        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class)))
            .thenReturn(null);
        User user = User.builder().id(1L).email("mahesh@example.com")
            .firstName("Mahesh").lastName("Patluri").role(Role.ROLE_USER).build();
        when(userRepository.findByEmail("mahesh@example.com")).thenReturn(Optional.of(user));
        when(jwtService.generateToken(any())).thenReturn("jwt-token");

        AuthResponse response = authService.login(loginRequest);

        assertThat(response.getToken()).isEqualTo("jwt-token");
        assertThat(response.getEmail()).isEqualTo("mahesh@example.com");
    }
}