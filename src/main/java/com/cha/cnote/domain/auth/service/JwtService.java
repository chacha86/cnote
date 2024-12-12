package com.cha.cnote.domain.auth.service;

import com.cha.cnote.domain.member.entity.Member;
import com.cha.cnote.domain.member.service.MemberService;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;

@Service
@RequiredArgsConstructor
public class JwtService {

    private final MemberService memberService;

    @Value("${jwt.access.secret-key}")
    private String accessKey;

    public String getMember(String token) {
//        return getClaims(token, type).getPayload().get("sub", String.class);
        return null;
    }

    public String createToken(String loginId) {

        Member loginedMember = memberService.getMember(loginId);
        String nickname = loginedMember.getNickname();
        Date expireDate = getExpirePeriod();

        return Jwts.builder()
                .subject(loginId)
                .claim("loginId", loginId)
                .claim("nickname", nickname)
                .claim("exp", expireDate)
                .signWith(getMyKey())
                .compact();
    }

    private SecretKey getMyKey() {
        return Keys.hmacShaKeyFor(Decoders.BASE64.decode(accessKey));
    }

    private Date getExpirePeriod() {
        int expireTime = 1000 * 60 * 10; // 10분
        return new Date(System.currentTimeMillis() + expireTime);
    }
}
