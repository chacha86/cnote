package com.cha.cnote.domain.member.auth.service;

import com.cha.cnote.domain.member.member.dto.MemberDto;
import com.cha.cnote.domain.member.auth.constant.AuthConstants;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;

@Service
@RequiredArgsConstructor
public class AuthTokenService {

    private static final String EMAIL = "email";
    private static final String NICKNAME = "nickname";
    private static final String EXP = "exp";


    private enum CheckType {
        VALID, EXPIRED, INVALID
    }

    @Value("${jwt.access.secret-key}")
    private String accessKey;


    public MemberDto getMemberByAccessToken(String accessToken) {

        Jws<Claims> jws = getClaims(accessToken);
        return MemberDto.builder()
                .email(jws.getBody().get(EMAIL, String.class))
                .nickname(jws.getBody().get(NICKNAME, String.class))
                .build();
    }

    public String createAccessToken(MemberDto memberDto) {

        return Jwts.builder()
                .subject(memberDto.getEmail())
                .claim(EMAIL, memberDto.getEmail())
                .claim(NICKNAME, memberDto.getNickname())
                .claim(EXP, new Date(System.currentTimeMillis() + AuthConstants.ACCESS_EXP_TIME))
                .signWith(getMyKey(accessKey))
                .compact();
    }

    public boolean isExpire(String accessToken) {
        return checkToken(accessToken) == CheckType.EXPIRED;
    }

    public boolean isValid(String accessToken) {
        return checkToken(accessToken) != CheckType.INVALID;
    }

    private SecretKey getMyKey(String key) {
        return Keys.hmacShaKeyFor(Decoders.BASE64.decode(key));
    }

    private Jws<Claims> getClaims(String token) {
        Jws<Claims> jws = null;
        jws = Jwts.parser()
                .verifyWith(getMyKey(accessKey))
                .build()
                .parseSignedClaims(token);
        return jws;
    }

    private CheckType checkToken(String accessToken) {
        try {
            getClaims(accessToken).getPayload().getSubject();
            return CheckType.VALID;
        } catch (MalformedJwtException | SignatureException e) {
            return CheckType.INVALID;
        } catch (ExpiredJwtException e) {
            return CheckType.EXPIRED;
        }
    }
}
