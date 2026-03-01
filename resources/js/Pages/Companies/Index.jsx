import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link, router } from '@inertiajs/react';

export default function Index({ auth, companies, filters }) {
    //Inertiaのフォームヘルパーを使う
    const { data, setData, get } = useForm({
        search: filters.search || '',
    });

    const handleSearch = (e) => {
        e.preventDefault();
        // /companies に検索ワードを付けてGETリクエストを送る
        get(route('companies.index'));
    };

    // 削除ボタンが押下時の処理
    const handleDelete = (id) => {
        if (confirm('本当に削除しますか？')) {
            router.delete(route('companies.destroy', id));
    }
};

    return (
        <AuthenticatedLayout
        user={auth.user}
        header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">企業一覧</h2>}
    >
        <Head title="企業一覧" />

        <div className="py-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                
                {/* 検索欄と新規登録ボタン */}
                <div className="mb-6 flex justify-between items-center">
                        <form onSubmit={handleSearch} className="flex">
                            <input
                                type="text"
                                value={data.search}
                                onChange={e => setData('search', e.target.value)}
                                placeholder="企業名で検索..."
                                className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm text-sm"
                            />
                            <button type="submit" className="ml-2 px-4 py-2 bg-gray-800 text-white rounded-md text-sm">検索</button>
                        </form>

                        {/* 新規登録ボタン*/}
                        <Link
                            href={route('companies.create')} 
                            className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-bold hover:bg-indigo-700"
                        >
                            + 新規企業登録
                        </Link>
                    </div>
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        {/*テーブルのマークアップ */}
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">企業名</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">担当者数</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">案件数</th>

                                {/* 操作ヘッダー */}
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">操作</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {companies.data.map((company) => (
                                    <tr key={company.id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {company.name}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {company.contacts.length} 名
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {company.deals.length} 件
                                        </td>
                                        {/* 詳細・編集・削除ボタン処理 */}
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-3">
                                            <Link href={route('companies.show', company.id)} className="text-green-600 hover:text-green-900">詳細</Link>
                                            
                                            {/* 権限フラグ(can_edit)が、trueの場合、編集・削除ボタンを表示 */}
                                            {auth.can_edit && (
                                                <>
                                                    <Link href={route('companies.edit', company.id)} className="text-indigo-600">編集</Link>
                                                    <button 
                                                        onClick={() => handleDelete(company.id)} 
                                                        className="text-red-600 hover:text-red-900"
                                                    >
                                                    削除
                                                    </button>
                                                </>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                    </div>
                    {/* ページネーション（1 2 3 次へ...） */}
                    <div className="mt-6 flex justify-center flex-wrap gap-1">
                        {companies.links.map((link, index) => (
                            link.url ? (
                                // URLがある場合は通常のLink
                                <Link
                                    key={index}
                                    href={link.url}
                                    className={`px-4 py-2 text-sm rounded-md border ${
                                        link.active ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-700 hover:bg-gray-50'
                                    }`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
            />
        ) : (
            // URLがnull（無効なボタン）の場合はただのspan（クリック不可）
            <span
                key={index}
                className="px-4 py-2 text-sm rounded-md border bg-white text-gray-300 cursor-not-allowed"
                dangerouslySetInnerHTML={{ __html: link.label }}
            />
        )
    ))}
</div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}