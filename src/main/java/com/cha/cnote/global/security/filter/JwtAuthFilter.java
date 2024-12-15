package com.cha.cnote.global.security.filter;

import com.cha.cnote.domain.member.ochestration.MemberAuthOrchestrator;
import com.cha.cnote.global.httpContext.HttpContext;
import com.cha.cnote.domain.member.auth.constant.AuthConstants;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter {

    private final MemberAuthOrchestrator memberAuthOrchestrator;
    private final HttpContext httpContext;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        if(request.getRequestURI().startsWith("/h2-console")) {
            filterChain.doFilter(request, response);
            return;
        }

        if(request.getRequestURI().startsWith("/api/v1/auth")){
            filterChain.doFilter(request, response);
            return;
        }
        if(isAuthorizationHeader()) {
            String accessToken = httpContext.getHeader(AuthConstants.AUTHORIZATION_HEADER);
            accessToken = accessToken.substring(AuthConstants.BEARER_PREFIX.length());
            accessToken = validateAccessToken(accessToken);
            String refreshToken = httpContext.getValueFromCookie(AuthConstants.REFRESH_TOKEN);

            httpContext.setHeader(AuthConstants.AUTHORIZATION_HEADER, AuthConstants.BEARER_PREFIX + accessToken);
            httpContext.setCookie(AuthConstants.REFRESH_TOKEN, refreshToken);
        }
        else {
            String accessToken = httpContext.getValueFromCookie(AuthConstants.ACCESS_TOKEN);
            accessToken = validateAccessToken(accessToken);
            String refreshToken = httpContext.getValueFromCookie(AuthConstants.REFRESH_TOKEN);

            httpContext.setCookie(AuthConstants.ACCESS_TOKEN, accessToken);
            httpContext.setCookie(AuthConstants.REFRESH_TOKEN, refreshToken);
        }

        filterChain.doFilter(request, response);
    }

    private String validateAccessToken(String accessToken) {

        String validatedToken = accessToken;

        if(!memberAuthOrchestrator.isValidAccessToken(accessToken)) {
            throw new RuntimeException("토큰이 유효하지 않습니다.");
        }

        if(memberAuthOrchestrator.isExpiredAccessToken(accessToken)) {
            String refreshToken = httpContext.getValueFromCookie(AuthConstants.REFRESH_TOKEN);
            validatedToken = memberAuthOrchestrator.getRefreshAccessToken(refreshToken);
        }

        return validatedToken;
    }

    private boolean isAuthorizationHeader() {
        String token = httpContext.getHeader(AuthConstants.AUTHORIZATION_HEADER);
        if (token == null) {
            System.out.println("토큰이 없습니다.");
            return false;
        }

        if(!token.startsWith(AuthConstants.BEARER_PREFIX)) {
            System.out.println("올바른 토큰이 아닙니다.");
            return false;
        }

        return true;
    }
 }
