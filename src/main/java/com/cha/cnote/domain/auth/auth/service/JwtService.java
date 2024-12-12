package com.cha.cnote.domain.auth.auth.service;

import com.cha.cnote.domain.member.entity.Member;
import com.cha.cnote.domain.member.service.MemberService;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;

@Service
@RequiredArgsConstructor
public class JwtService {

//    private final MemberService memberService;

    @Value("${jwt.access.secret-key}")
    private String accessKey;

    @Getter
    private Claims expiredClaims;

    public String createToken(String sub, String name) {
        Date expireDate = getExpirePeriod();
        return Jwts.builder()
                .subject(sub)
                .claim("loginId", sub)
                .claim("nickname", name)
                .claim("exp", expireDate)
                .signWith(getMyKey())
                .compact();
    }

    public String getSubject(String token) {
        Jws<Claims> jws = getClaims(token);
        return jws.getPayload().getSubject();
    }

    private SecretKey getMyKey() {
        return Keys.hmacShaKeyFor(Decoders.BASE64.decode(accessKey));
    }

    private Date getExpirePeriod() {
        int expireTime = 1000 * 60 * 10; // 10분
        return new Date(System.currentTimeMillis() + expireTime);
    }

    private Jws<Claims> getClaims(String token) {
        Jws<Claims> jws = null;
        jws = Jwts.parser()
                .verifyWith(getMyKey())
                .build()
                .parseSignedClaims(token);
        return jws;
    }

    public boolean isExpired(String accessToken) {
        try {
            getClaims(accessToken).getPayload().get("exp", Date.class);
        }catch (ExpiredJwtException e){
            expiredClaims = e.getClaims();
            return true;
        }
        return false;
    }
}
