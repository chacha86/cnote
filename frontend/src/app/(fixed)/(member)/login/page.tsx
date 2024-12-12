import Link from "next/link";

export default function Login() {

    return (
        <div className="h-[90vh] flex items-center justify-center">
            <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8 bg-gray-100">
                <h2 className="text-xl font-semibold text-center mb-4">로그인</h2>
                <form className="space-y-4">
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
                    <Link href="/join" className="text-green-600 font-medium hover:underline">
                        회원가입
                    </Link>
                </p>
            </div>
        </div>
    );
}