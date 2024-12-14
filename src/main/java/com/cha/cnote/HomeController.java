package com.cha.cnote;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
public class HomeController {

    @GetMapping("/")
    public String home(@AuthenticationPrincipal String username) {
        UUID uuid = UUID.randomUUID();
        System.out.println(uuid.toString());
        return "Hello, Spring Boot!" + username;
    }
}
