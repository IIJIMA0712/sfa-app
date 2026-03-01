import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';

export default function Create({ auth }) {
    // Inertiaのフォーム用フック。入力データや送信状態を管理。
    const { data, setData, post, processing, errors } = useForm({
        name: '', // 企業名
    });

    const submit = (e) => {
        e.preventDefault();
        // Laravel側の 'companies.store' にデータを送る
        post(route('companies.store')); 
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">新規企業登録</h2>}
        >
            <Head title="新規企業登録" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <form onSubmit={submit} className="max-w-md">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">企業名</label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={e => setData('name', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                    required
                                />
                                {/* バリデーションエラーがあれば表示する */}
                                {errors.name && <div className="text-red-600 text-sm mt-1">{errors.name}</div>}
                            </div>

                            <div className="mt-6 flex items-center gap-4">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-4 py-2 bg-indigo-600 text-white rounded-md font-semibold hover:bg-indigo-700 disabled:opacity-50"
                                >
                                    保存する
                                </button>
                                <Link href={route('companies.index')} className="text-sm text-gray-600 hover:underline">
                                    キャンセル
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}