package com.cha.cnote.domain.member.member.entity;

import com.cha.cnote.domain.member.member.dto.MemberDto;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Service;

import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true)
    private String email;
    private String password;
    private String nickname;
    @Column(unique = true)
    private String refreshToken;

    public MemberDto toDto() {
        return MemberDto.builder()
                .email(this.email)
                .nickname(this.nickname)
                .refreshToken(this.refreshToken)
                .build();
    }

    public User toSecurityUser() {
        return new User(this.email, this.password, List.of(new SimpleGrantedAuthority("ROLE_USER")));
    }
}
