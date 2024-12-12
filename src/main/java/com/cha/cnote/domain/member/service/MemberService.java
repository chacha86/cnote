package com.cha.cnote.domain.member.service;

import com.cha.cnote.domain.member.entity.Member;
import com.cha.cnote.domain.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;

    public Member getMember(String loginId) {
        return memberRepository.findByLoginId(loginId).orElseThrow(() -> new IllegalArgumentException("해당 회원이 존재하지 않습니다."));
    }
}
