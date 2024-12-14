package com.cha.cnote;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Profile;
import org.springframework.test.context.ActiveProfiles;

import java.util.UUID;

@SpringBootTest
@ActiveProfiles("test")
class CnoteApplicationTests {

    @Test
    void contextLoads() {
        UUID.randomUUID().toString();
    }

}
