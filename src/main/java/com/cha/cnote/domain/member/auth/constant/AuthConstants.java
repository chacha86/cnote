package com.cha.cnote.domain.member.auth.constant;

public class AuthConstants {
    public static final String AUTHORIZATION_HEADER = "Authorization";
    public static final String BEARER_PREFIX = "Bearer ";
    public static final String ACCESS_TOKEN = "accessToken";
    public static final String REFRESH_TOKEN = "refreshToken";

    public static final int ACCESS_EXP_TIME = 1000 * 60 * 10; // 10분
}
