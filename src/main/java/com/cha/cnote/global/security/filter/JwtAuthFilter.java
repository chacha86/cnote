package com.cha.cnote.global.security.filter;

import com.cha.cnote.domain.member.ochestration.MemberAuthOrchestrator;
import com.cha.cnote.global.reqResHandler.HttpContext;
import com.cha.cnote.global.security.constant.SecurityConstants;
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
            String accessToken = httpContext.getHeader(SecurityConstants.AUTHORIZATION_HEADER);
            accessToken = accessToken.substring(SecurityConstants.BEARER_PREFIX.length());
            accessToken = validateAccessToken(accessToken);
//            String refreshToken = memberAuthOrchestrator.getRefreshTokenByAccessToken(accessToken);
            String refreshToken = httpContext.getValueFromCookie(SecurityConstants.REFRESH_TOKEN);

            httpContext.setHeader(SecurityConstants.AUTHORIZATION_HEADER, SecurityConstants.BEARER_PREFIX + accessToken);
            httpContext.setCookie(SecurityConstants.REFRESH_TOKEN, refreshToken);
        }
        else {
            String accessToken = httpContext.getValueFromCookie(SecurityConstants.ACCESS_TOKEN);
            accessToken = validateAccessToken(accessToken);
            String refreshToken = httpContext.getValueFromCookie(SecurityConstants.REFRESH_TOKEN);

            httpContext.setCookie(SecurityConstants.ACCESS_TOKEN, accessToken);
            httpContext.setCookie(SecurityConstants.REFRESH_TOKEN, refreshToken);
        }

        filterChain.doFilter(request, response);
    }

    private String validateAccessToken(String accessToken) {

        String validatedToken = accessToken;

        if(!memberAuthOrchestrator.isValidAccessToken(accessToken)) {
            throw new RuntimeException("토큰이 유효하지 않습니다.");
        }

        if(memberAuthOrchestrator.isExpiredAccessToken(accessToken)) {
            String refreshToken = httpContext.getValueFromCookie(SecurityConstants.REFRESH_TOKEN);
            validatedToken = memberAuthOrchestrator.getRefreshAccessToken(refreshToken);
        }

        return validatedToken;
    }

    private boolean isAuthorizationHeader() {
        String token = httpContext.getHeader(SecurityConstants.AUTHORIZATION_HEADER);
        if (token == null) {
            System.out.println("토큰이 없습니다.");
            return false;
        }

        if(!token.startsWith(SecurityConstants.BEARER_PREFIX)) {
            System.out.println("올바른 토큰이 아닙니다.");
            return false;
        }

        return true;
    }
 }
