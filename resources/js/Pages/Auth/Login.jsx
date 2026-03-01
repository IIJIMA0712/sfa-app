import { useEffect } from "react";
import Checkbox from "@/Components/Checkbox";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route("login"));
    };

    return (
        <GuestLayout>
            <Head title="ログイン | SFA/CRM System" />

            <div className="mb-8 text-center">
                <h2 className="text-2xl font-bold text-gray-800">
                    おかえりなさい
                </h2>
                <p className="text-sm text-gray-600 mt-2">
                    アカウント情報を入力してログインしてください
                </p>
            </div>

            {status && (
                <div className="mb-4 font-medium text-sm text-green-600">
                    {status}
                </div>
            )}

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="email" value="メールアドレス" />
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-md shadow-sm"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData("email", e.target.value)}
                    />
                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="パスワード" />
                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-md shadow-sm"
                        autoComplete="current-password"
                        onChange={(e) => setData("password", e.target.value)}
                    />
                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="block mt-4 flex items-center justify-between">
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) =>
                                setData("remember", e.target.checked)
                            }
                        />
                        <span className="ms-2 text-sm text-gray-600">
                            ログイン状態を保存する
                        </span>
                    </label>
                </div>

                <div className="mt-6">
                    <PrimaryButton
                        className="w-full justify-center py-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 transition"
                        disabled={processing}
                    >
                        ログイン
                    </PrimaryButton>
                </div>

                <div className="mt-6 text-center space-y-2">
                    {canResetPassword && (
                        <Link
                            href={route("password.request")}
                            className="block text-sm text-gray-600 hover:text-blue-600 transition"
                        >
                            パスワードをお忘れですか？
                        </Link>
                    )}
                    <Link
                        href={route("register")}
                        className="block text-sm text-blue-600 font-bold hover:underline"
                    >
                        新規アカウントを作成する
                    </Link>
                </div>
            </form>
            <div className="mt-8 space-y-4">
                <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl">
                    <h3 className="text-xs font-bold text-blue-800 uppercase tracking-wider mb-2 flex items-center">
                        <span className="mr-2">●</span>{" "}
                        閲覧用テストアカウント(管理者権限あり)
                    </h3>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                            <span className="block text-[10px] text-gray-400 uppercase">
                                Email
                            </span>
                            <span className="font-mono font-medium text-gray-700">
                                admin@example.com
                            </span>
                        </div>
                        <div>
                            <span className="block text-[10px] text-gray-400 uppercase">
                                Password
                            </span>
                            <span className="font-mono font-medium text-gray-700">
                                password
                            </span>
                        </div>
                    </div>
                </div>

                <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl">
                    <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wider mb-2 flex items-center">
                        <span className="mr-2">●</span>{" "}
                        閲覧用テストアカウント(一般ユーザー等)
                    </h3>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                            <span className="block text-[10px] text-gray-400 uppercase">
                                Email
                            </span>
                            <span className="font-mono font-medium text-gray-700 leading-none">
                                sasaki.rei@example.org
                            </span>
                        </div>
                        <div>
                            <span className="block text-[10px] text-gray-400 uppercase">
                                Password
                            </span>
                            <span className="font-mono font-medium text-gray-700">
                                password
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
