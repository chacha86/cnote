package com.cha.cnote.domain.member.member.service;

import com.cha.cnote.domain.member.member.dto.MemberDto;
import com.cha.cnote.domain.member.member.entity.Member;
import com.cha.cnote.domain.member.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.swing.*;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.Base64;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;

    public Member getMemberByRefreshToken(String refreshToken) {
        return memberRepository.findByRefreshToken(refreshToken).orElseThrow(() -> new IllegalArgumentException("해당 회원이 존재하지 않습니다."));
    }

    public String generateRefreshToken() {
        try {
            // 1. 보안 난수 생성
            SecureRandom secureRandom = new SecureRandom();
            byte[] randomBytes = new byte[32]; // 32바이트 난수
            secureRandom.nextBytes(randomBytes);

            // 2. SHA256으로 해싱
            MessageDigest sha256 = MessageDigest.getInstance("SHA-256");
            byte[] hashedBytes = sha256.digest(randomBytes);

            // 3. Base64 인코딩 (URL-safe)
            return Base64.getUrlEncoder().withoutPadding().encodeToString(hashedBytes);

        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("SHA-256 Algorithm not found", e);
        }
    }

    public void join( String email, String password, String nickname) {
        Member member = Member.builder()
                .email(email)
                .password(passwordEncoder.encode(password))
                .nickname(nickname)
                .refreshToken(generateRefreshToken())
                .build();

        memberRepository.save(member);
    }

    public Member getMember(String username) {
        return memberRepository.findByEmail(username)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 사용자입니다."));
    }

}
