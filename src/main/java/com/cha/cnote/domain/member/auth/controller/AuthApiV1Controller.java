package com.cha.cnote.domain.member.auth.controller;

import com.cha.cnote.domain.member.ochestration.MemberAuthOrchestrator;
import com.cha.cnote.global.ResData;
import com.cha.cnote.global.httpContext.HttpContext;
import com.cha.cnote.domain.member.auth.constant.AuthConstants;
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
    public ResData<String> login(@RequestBody LoginRequest loginRequest) {

        String accessToken = memberAuthOrchestrator.getAccessToken(loginRequest.email);
        String refreshToken = memberAuthOrchestrator.getRefreshTokenByUser(loginRequest.email);

        httpContext.setHeader(AuthConstants.AUTHORIZATION_HEADER, AuthConstants.BEARER_PREFIX + accessToken);
        httpContext.setCookie(AuthConstants.ACCESS_TOKEN, accessToken);
        httpContext.setCookie(AuthConstants.REFRESH_TOKEN, refreshToken);

        return new ResData<>("2000001", "로그인 성공", loginRequest.email);
    }

    @PostMapping("/logout")
    public String logout(HttpServletResponse res) {
        httpContext.removeCookie(AuthConstants.ACCESS_TOKEN);
        httpContext.removeCookie(AuthConstants.REFRESH_TOKEN);

        return "{\"result\" : \"success\"}";
    }
}
