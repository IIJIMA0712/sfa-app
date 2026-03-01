import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { ArrowLeft, Briefcase } from "lucide-react";

// ステータス定義
const DEAL_STATUS = {
    1: { label: "見込み", color: "bg-gray-100 text-gray-800" },
    2: { label: "ヒアリング", color: "bg-blue-100 text-blue-800" },
    3: { label: "提案中", color: "bg-indigo-100 text-indigo-800" },
    4: { label: "見積提示", color: "bg-purple-100 text-purple-800" },
    5: { label: "受注", color: "bg-green-100 text-green-800" },
    6: { label: "失注", color: "bg-red-100 text-red-800" },
};

export default function Show({ auth, company, latest_deal_date, can }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        {/* 戻るボタン */}
                        <Link
                            href={route("companies.index")}
                            className="mr-4 p-2 text-gray-400 hover:text-gray-600 transition"
                        >
                            <ArrowLeft size={20} />
                        </Link>
                        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                            企業詳細: {company.name}
                        </h2>
                    </div>
                </div>
            }
        >
            <Head title={`企業詳細 - ${company.name}`} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* 左：基本情報 */}
                        <div className="bg-white p-6 shadow sm:rounded-lg md:col-span-1">
                            <h3 className="text-lg font-bold mb-4 border-b pb-2">
                                基本情報
                            </h3>
                            <div className="space-y-4">
                                <div>
                                    <span className="text-gray-500 text-sm">
                                        企業名
                                    </span>
                                    <p className="font-medium">
                                        {company.name}
                                    </p>
                                </div>
                                <div>
                                    <span className="text-gray-500 text-sm">
                                        住所
                                    </span>
                                    <p className="font-medium">
                                        {company.address || "未登録"}
                                    </p>
                                </div>
                                <div className="pt-4">
                                    {auth.can_edit && (
                                        <Link
                                            href={route(
                                                "companies.edit",
                                                company.id
                                            )}
                                            className="text-indigo-600 hover:underline text-sm"
                                        >
                                            編集する
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* 右：担当者一覧 */}
                        <div className="bg-white p-6 shadow sm:rounded-lg md:col-span-2">
                            <h3 className="text-lg font-bold mb-4 border-b pb-2 flex justify-between items-center">
                                担当者一覧
                                <span className="text-sm font-normal text-gray-500">
                                    {company.contacts.length}名登録
                                </span>
                            </h3>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead>
                                        <tr>
                                            <th className="text-left text-xs text-gray-500 uppercase">
                                                氏名
                                            </th>
                                            <th className="text-left text-xs text-gray-500 uppercase">
                                                部署/役職
                                            </th>
                                            <th className="text-left text-xs text-gray-500 uppercase">
                                                連絡先
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {company.contacts.map((contact) => (
                                            <tr key={contact.id}>
                                                <td className="py-3">
                                                    <div className="flex items-center">
                                                        <span className="font-bold">
                                                            {contact.name}
                                                        </span>
                                                        {/* 決裁権限者 */}
                                                        {!!contact.is_key_person && (
                                                            <span className="ml-2 px-2 py-0.5 bg-yellow-100 text-yellow-800 text-xs rounded-full font-bold">
                                                                🔑 キーマン
                                                            </span>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="py-3 text-sm text-gray-600">
                                                    {contact.department} /{" "}
                                                    {contact.position}
                                                </td>
                                                <td className="py-3 text-sm text-gray-600">
                                                    {contact.email}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* 案件一覧 */}
                    <div className="bg-white p-6 shadow sm:rounded-lg">
                        <h3 className="text-lg font-bold mb-4 border-b pb-2 text-indigo-700">
                            案件一覧
                        </h3>
                        <h3 className="text-lg font-bold mb-4 border-b pb-2 flex items-center text-indigo-700">
                            <Briefcase className="mr-2" size={18} /> 案件進捗
                        </h3>
                        <div className="overflow-x-auto">
                            <table className="min-w-full">
                                <thead className="bg-gray-50">
                                    <tr className="text-xs font-medium text-gray-500 uppercase">
                                        <th className="px-4 py-3 text-left">
                                            案件名
                                        </th>
                                        <th className="px-4 py-3 text-left">
                                            フェーズ
                                        </th>
                                        <th className="px-4 py-3 text-left">
                                            営業担当者
                                        </th>
                                        <th className="px-4 py-3 text-right">
                                            想定受注金額
                                        </th>
                                        <th className="px-4 py-3 text-left">
                                            完了予定日
                                        </th>
                                        <th className="px-4 py-3 text-left">
                                            最終更新日
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {company.deals.map((deal) => {
                                        // 今日の日付
                                        const today = new Date();
                                        const todayStr = today
                                            .toISOString()
                                            .split("T")[0];

                                        // 放置判定（最終更新から30日以上）
                                        const dealUpdateDate = new Date(
                                            deal.updated_at
                                        );
                                        //30日後の日付計算
                                        const diff = Math.floor(
                                            (today - dealUpdateDate) /
                                                (1000 * 60 * 60 * 24)
                                        );
                                        const isStale = diff > 30;

                                        // 完了予定日超過判定
                                        // ステータスが1〜4（受注・失注以外）かつ、予定日が今日より前
                                        const isExpired =
                                            [1, 2, 3, 4].includes(
                                                deal.status
                                            ) &&
                                            deal.expected_closing_date &&
                                            deal.expected_closing_date <
                                                todayStr;

                                        const status = DEAL_STATUS[
                                            deal.status
                                        ] || {
                                            label: "不明",
                                            color: "bg-gray-100",
                                        };

                                        return (
                                            <tr
                                                key={deal.id}
                                                className={`${
                                                    isStale || isExpired
                                                        ? "bg-red-50"
                                                        : ""
                                                } hover:bg-gray-50 text-sm transition`}
                                            >
                                                <td className="px-4 py-4 font-bold text-gray-900">
                                                    {deal.title}
                                                    {/* 放置ラベル */}
                                                    {isStale && (
                                                        <span className="ml-2 text-red-600 text-[10px] border border-red-200 bg-white px-1.5 py-0.5 rounded shadow-sm font-bold">
                                                            ⚠️ 放置({diff}日)
                                                        </span>
                                                    )}
                                                    {/* 期限切れラベル */}
                                                    {isExpired && (
                                                        <span className="ml-2 text-amber-600 text-[10px] border border-amber-200 bg-white px-1.5 py-0.5 rounded shadow-sm font-bold">
                                                            ⏰ 期限切
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="px-4 py-4">
                                                    <span
                                                        className={`px-3 py-1 rounded-full text-xs font-bold ${status.color}`}
                                                    >
                                                        {status.label}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-4 text-sm text-gray-600">
                                                    {deal.user?.name ||
                                                        "未割当"}
                                                </td>
                                                <td className="px-4 py-4 text-right font-mono text-gray-600">
                                                    ¥
                                                    {Number(
                                                        deal.amount
                                                    ).toLocaleString()}
                                                </td>

                                                {/* 完了予定日が過ぎている場合、文字を橙にする */}
                                                <td
                                                    className={`px-4 py-4 ${
                                                        isExpired
                                                            ? "text-red-600 font-bold"
                                                            : "text-gray-600"
                                                    }`}
                                                >
                                                    {deal.expected_closing_date
                                                        ? new Date(
                                                              deal.expected_closing_date
                                                          ).toLocaleDateString(
                                                              "ja-JP"
                                                          )
                                                        : "-"}
                                                </td>

                                                <td
                                                    className={`px-4 py-4 text-sm ${
                                                        isStale
                                                            ? "text-red-600 font-bold"
                                                            : "text-gray-500"
                                                    }`}
                                                >
                                                    {new Date(
                                                        deal.updated_at
                                                    ).toLocaleDateString()}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                            {company.deals.length === 0 && (
                                <p className="text-center py-6 text-gray-400 italic">
                                    案件データがありません
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
