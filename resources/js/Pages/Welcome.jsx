import { Link, Head } from "@inertiajs/react";

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="SFA/CRM System" />
            <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
                <div className="max-w-md w-full bg-white shadow-lg rounded-2xl p-8 text-center">
                    <h1 className="text-3xl font-extrabold text-blue-600 mb-2">
                        SFA / CRM System
                    </h1>
                    <p className="text-gray-600 mb-8">
                        営業活動を可視化し、チームの進捗を最大化する。
                    </p>

                    <div className="space-y-4">
                        {auth.user ? (
                            <Link
                                href={route("dashboard")}
                                className="block w-full py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition text-center"
                            >
                                ダッシュボードへ
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route("login")}
                                    className="block w-full py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition text-center"
                                >
                                    ログイン
                                </Link>
                                <Link
                                    href={route("register")}
                                    className="block w-full py-3 bg-white text-blue-600 border border-blue-600 rounded-xl font-bold hover:bg-blue-50 transition text-center"
                                >
                                    新規登録
                                </Link>
                            </>
                        )}
                    </div>
                </div>

                <footer className="mt-8 text-gray-400 text-sm">
                    &copy; 2026 SFA-App Development.
                </footer>
            </div>
        </>
    );
}
