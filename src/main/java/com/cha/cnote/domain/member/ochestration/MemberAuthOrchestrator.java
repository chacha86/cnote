package com.cha.cnote.domain.member.ochestration;

import com.cha.cnote.domain.member.auth.service.AuthTokenService;
import com.cha.cnote.domain.member.member.dto.MemberDto;
import com.cha.cnote.domain.member.member.entity.Member;
import com.cha.cnote.domain.member.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MemberAuthOrchestrator {
    private final MemberService memberService;
    private final AuthTokenService authTokenService;

    public boolean isExpiredAccessToken(String accessToken) {
        return authTokenService.isExpire(accessToken);
    }

    public boolean isValidAccessToken(String accessToken) {
        return authTokenService.isValid(accessToken);
    }

    public String getRefreshAccessToken(String refreshToken) {
        Member member = memberService.getMemberByRefreshToken(refreshToken);
        return authTokenService.createAccessToken(member.toDto());
    }

    public String getAccessToken(String username) {
        Member member = memberService.getMember(username);
        return authTokenService.createAccessToken(member.toDto());
    }

    public String getRefreshTokenByUser(String username) {
        Member member = memberService.getMember(username);
        return member.toDto().getRefreshToken();
    }

    public String getRefreshTokenByAccessToken(String accessToken) {
        MemberDto memberDto = authTokenService.getMemberByAccessToken(accessToken);
        return memberDto.getRefreshToken();
    }
}
