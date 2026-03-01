import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';

export default function Edit({ auth, company }) {
    // 1. useForm の初期値に、コントローラーから渡ってきた company のデータをセット
    const { data, setData, patch, processing, errors } = useForm({
        name: company.name || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // 2. 更新処理なので patch を使用。ルートには ID を渡す。
        patch(route('companies.update', company.id));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">企業編集</h2>}
        >
            <Head title="企業編集" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        
                        <form onSubmit={handleSubmit} className="max-w-md">
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">企業名</label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500"
                                />
                                {/* バリデーションエラーがあれば表示 */}
                                {errors.name && <div className="text-red-500 text-xs mt-1">{errors.name}</div>}
                            </div>

                            <div className="flex items-center gap-4">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-4 py-2 bg-indigo-600 text-white rounded-md font-bold hover:bg-indigo-700 disabled:opacity-50"
                                >
                                    更新する
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