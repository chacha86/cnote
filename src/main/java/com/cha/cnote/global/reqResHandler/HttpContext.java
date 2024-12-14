package com.cha.cnote.global.reqResHandler;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.context.annotation.RequestScope;

import java.util.Arrays;

@RequestScope
@Component
@RequiredArgsConstructor
public class HttpContext {
    private final HttpServletRequest request;
    private final HttpServletResponse response;

    public void setHeader(String headerName, String value) {
        response.setHeader(headerName, value);
    }

    public String getHeader(String headerName) {
        return request.getHeader(headerName);
    }

    public String getValueFromCookie(String cookieName) {
        Cookie[] cookies = request.getCookies();
        System.out.println(request.getRequestURI());
        if(cookies == null) {
            throw new RuntimeException("쿠키가 없습니다.");
        }
        Cookie targetCookie = Arrays.stream(request.getCookies())
                .filter(cookie -> cookie.getName().equals(cookieName))
                .findFirst().orElseThrow(() -> new RuntimeException(cookieName + "이 없습니다."));

        return targetCookie.getValue();
    }

    public void setCookie(String cookieName, String cookieValue) {
        Cookie cookie = new Cookie(cookieName, cookieValue);
        cookie.setHttpOnly(true);
        cookie.setPath("/");
        cookie.setMaxAge(60 * 60 * 24); // 1 day
        cookie.setSecure(true);
        cookie.setAttribute("SameSite", "Strict");

        response.addCookie(cookie);
    }
}