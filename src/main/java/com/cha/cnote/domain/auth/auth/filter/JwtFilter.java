package com.cha.cnote.domain.auth.auth.filter;

import com.cha.cnote.domain.auth.auth.service.JwtService;
import com.cha.cnote.domain.auth.refreshToken.service.RefreshTokenService;
import io.jsonwebtoken.Claims;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.ArrayList;

@Component
@RequiredArgsConstructor
public class JwtFilter extends OncePerRequestFilter {
    private final JwtService jwtService;
    private final RefreshTokenService refreshTokenService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        String accessToken = getAccessToken(request);

        if(jwtService.isExpired(accessToken)) {
            Claims expiredClaims = jwtService.getExpiredClaims();
            String sub = expiredClaims.getSubject();
            String name = expiredClaims.get("nickname", String.class);
            boolean isValid = refreshTokenService.isVaild(sub);

            if(isValid) {
                String newAccessToken = jwtService.createToken(sub, name);
                Cookie accessTokenCookie = makeCookie("accessToken", newAccessToken);
                response.addCookie(accessTokenCookie);
                accessToken = newAccessToken;
            }
        }
        authenticate(accessToken);
        filterChain.doFilter(request, response);
    }

    private void authenticate(String accessToken) {
        String username = jwtService.getSubject(accessToken);
        Authentication authentication = new UsernamePasswordAuthenticationToken(username, null, new ArrayList<>());
        SecurityContextHolder.getContext().setAuthentication(authentication);
    }

    private Cookie makeCookie(String name, String newAccessToken) {
        Cookie cookie = new Cookie(name, newAccessToken);
        cookie.setHttpOnly(true);
        cookie.setPath("/");
        cookie.setMaxAge(60 * 10);
        return cookie;
    }

    private String getAccessToken(HttpServletRequest request) {
        String token = request.getHeader("Authorization");
        if (token == null) {
            throw new RuntimeException("토큰이 없습니다.");
        }

        if(!token.startsWith("Bearer ")) {
            throw new RuntimeException("토큰이 올바르지 않습니다.");
        }

        return token.substring("Bearer ".length());
    }
}
