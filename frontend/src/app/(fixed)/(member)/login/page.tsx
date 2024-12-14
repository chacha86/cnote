"use client";
import { useTestContext } from "@/app/context/memberContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";

export default function Login() {
  const router = useRouter();
  const { setUsername } = useTestContext();

  const login = (email: string, password: string) => {
    fetch("http://localhost:8080/api/v1/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
          setUsername(json.data);
          router.push("/list");
      })
      .catch((error) => {
        alert("로그인 실패");
      });
  };

  const checkSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const email = form.email;
    const password = form.password;

    if (email.value.trim().length === 0) {
      alert("이메일을 입력하세요");
      email.focus();
      return;
    }

    if (password.value.trim().length === 0) {
      alert("비밀번호를 입력하세요");
      password.focus();
      return;
    }

    login(email.value, password.value);
  };

  return (
    <div className="h-[90vh] flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8 bg-gray-100">
        <h2 className="text-xl font-semibold text-center mb-4">로그인</h2>
        <form className="space-y-4" onSubmit={checkSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              이메일
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
              placeholder="이메일을 입력하세요"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              비밀번호
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
              placeholder="비밀번호를 입력하세요"
            />
          </div>
          <div className="flex items-center justify-end">
            <a href="#" className="text-sm text-green-600 hover:underline">
              비밀번호 찾기
            </a>
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-green-500 text-white rounded-md shadow hover:bg-green-600"
          >
            로그인
          </button>
        </form>
        <p className="mt-6 text-sm text-center text-gray-600">
          계정이 없으신가요?{" "}
          <Link
            href="/join"
            className="text-green-600 font-medium hover:underline"
          >
            회원가입
          </Link>
        </p>
      </div>
    </div>
  );
}
