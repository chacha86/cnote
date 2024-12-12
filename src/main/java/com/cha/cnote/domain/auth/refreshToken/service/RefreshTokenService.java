package com.cha.cnote.domain.auth.refreshToken.service;

import com.cha.cnote.domain.auth.refreshToken.entity.RefreshToken;
import com.cha.cnote.domain.auth.refreshToken.repository.RefreshTokenRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RefreshTokenService {

    private final RefreshTokenRepository refreshTokenRepository;

    public RefreshToken getOne(long id) {
        return refreshTokenRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("해당 리프레시 토큰이 존재하지 않습니다."));
    }

    public boolean isVaild(String sub) {
        return refreshTokenRepository.findByMemberLoginId(sub).isPresent();
    }
}
