package com.cha.cnote.domain.auth.refreshToken.repository;

import com.cha.cnote.domain.auth.refreshToken.entity.RefreshToken;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {
    Optional<Object> findByMemberLoginId(String sub);
}
