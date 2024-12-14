package com.cha.cnote.domain.member.member.repository;

import com.cha.cnote.domain.member.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {
    Optional<Member> findByRefreshToken(String refreshToken);
    Optional<Member> findByEmail(String email);
}
