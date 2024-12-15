import { cookies } from "next/headers";

export async function serverFetchWrapper(url: string) {
  const serverUrl = "http://cnote-back:8080" + url;
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken");
  const refreshToken = cookieStore.get("refreshToken");

  if (accessToken === null || accessToken === undefined) {
    console.log("accessToken 토큰 없음");
    return null;
  }

  if (refreshToken === null || refreshToken === undefined) {
    console.log("refresh 토큰 없음");
    return null;
  }

  const res = await fetch(serverUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken.value}`,
      Cookie: `refreshToken=${refreshToken.value}`,
    },
  });

  return res;
}
