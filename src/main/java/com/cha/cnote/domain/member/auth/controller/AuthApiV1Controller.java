package com.cha.cnote.domain.member.auth.controller;

import com.cha.cnote.HomeController;
import com.cha.cnote.domain.member.ochestration.MemberAuthOrchestrator;
import com.cha.cnote.global.reqResHandler.HttpContext;
import com.cha.cnote.global.security.constant.SecurityConstants;
import com.cha.cnote.global.security.filter.JwtAuthFilter;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/auth")
public class AuthApiV1Controller {

    private final MemberAuthOrchestrator memberAuthOrchestrator;
    private final HttpContext httpContext;

    @Getter
    @AllArgsConstructor
    public static class LoginRequest {
        private String email;
        private String password;
    }

    @PostMapping("/login")
    public String login(@RequestBody LoginRequest loginRequest) {

        String accessToken = memberAuthOrchestrator.getAccessToken(loginRequest.email);
        String refreshToken = memberAuthOrchestrator.getRefreshTokenByUser(loginRequest.email);

        httpContext.setHeader(SecurityConstants.AUTHORIZATION_HEADER, SecurityConstants.BEARER_PREFIX + accessToken);
        httpContext.setCookie(SecurityConstants.ACCESS_TOKEN, accessToken);
        httpContext.setCookie(SecurityConstants.REFRESH_TOKEN, refreshToken);

        return "Hello, Spring Boot!" + loginRequest;
    }
}
