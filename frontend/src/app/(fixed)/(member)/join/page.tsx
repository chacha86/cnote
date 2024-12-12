export default function Join() {

    return (
        <div className="h-[90vh] flex items-center justify-center">
            <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8 bg-gray-100">
                <h2 className="text-xl font-semibold text-center mb-4">회원가입</h2>
                <form className="space-y-4">
                    <div>
                        <input
                            type="email"
                            id="email"
                            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                            placeholder="이메일"
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            id="password"
                            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                            placeholder="비밀번호"
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            id="passwordConfirm"
                            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                            placeholder="비밀번호 확인"
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            id="nickname"
                            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                            placeholder="닉네임"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-green-500 text-white rounded-md shadow hover:bg-green-600"
                    >
                        등록
                    </button>
                </form>
            </div>
        </div>
    );
}