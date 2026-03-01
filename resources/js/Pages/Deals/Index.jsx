import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";

export default function Index({ auth, deals }) {
    // ステータス更新の処理
    const handleStatusChange = (id, newStatus) => {
        router.patch(
            route("deals.update", id),
            {
                status: newStatus,
            },
            {
                preserveScroll: true, // 更新後もスクロール位置を維持
            }
        );
    };

    // 放置日数計算
    const getDaysSinceLastActivity = (dateString) => {
        if (!dateString) return null;
        const lastDate = new Date(dateString);
        const today = new Date();
        const diffTime = Math.abs(today - lastDate);
        return Math.floor(diffTime / (1000 * 60 * 60 * 24));
    };

    //ラベルの色
    const getStatusInfo = (status) => {
        const statuses = {
            1: { label: "見込み", color: "bg-blue-100 text-blue-800" },
            2: { label: "ヒアリング", color: "bg-purple-100 text-purple-800" },
            3: { label: "提案中", color: "bg-yellow-100 text-yellow-800" },
            4: { label: "見積提示", color: "bg-orange-100 text-orange-800" },
            5: { label: "受注", color: "bg-green-100 text-green-800" },
            6: { label: "失注", color: "bg-red-100 text-red-800" },
        };
        return statuses[status] || { label: "不明", color: "bg-gray-100" };
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="担当案件管理画面" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <h2 className="text-xl font-semibold mb-6">担当案件管理</h2>

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead>
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        案件名 / 企業名
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        進捗 (その場で更新可)
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        最終活動日
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        完了予定日
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {deals.map((deal) => {
                                    // 放置日数の計算
                                    const days = getDaysSinceLastActivity(
                                        deal.last_activity_at
                                    );
                                    return (
                                        <tr key={deal.id}>
                                            <td className="px-6 py-4">
                                                <div className="font-bold">
                                                    {deal.title}
                                                </div>
                                                <div className="text-xs text-gray-500">
                                                    {deal.company?.name}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <select
                                                    value={deal.status}
                                                    onChange={(e) =>
                                                        handleStatusChange(
                                                            deal.id,
                                                            e.target.value
                                                        )
                                                    }
                                                    className={`text-xs rounded-full border-none font-semibold ${
                                                        getStatusInfo(
                                                            deal.status
                                                        ).color
                                                    }`}
                                                >
                                                    <option value="1">
                                                        見込み
                                                    </option>
                                                    <option value="2">
                                                        ヒアリング
                                                    </option>
                                                    <option value="3">
                                                        提案中
                                                    </option>
                                                    <option value="4">
                                                        見積提示
                                                    </option>
                                                    <option value="5">
                                                        受注
                                                    </option>
                                                    <option value="6">
                                                        失注
                                                    </option>
                                                </select>
                                            </td>
                                            <td className="px-6 py-4 text-sm">
                                                <div>
                                                    {deal.last_activity_at
                                                        ? new Date(
                                                              deal.last_activity_at
                                                          ).toLocaleDateString()
                                                        : "-"}
                                                </div>
                                                {/* 30日以上の放置警告 */}
                                                {days >= 30 && (
                                                    <div className="text-[10px] text-red-600 font-bold mt-1 animate-pulse">
                                                        ⚠️ {days}日間放置
                                                    </div>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-600">
                                                {deal.expected_closing_date
                                                    ? new Date(
                                                          deal.expected_closing_date
                                                      ).toLocaleDateString(
                                                          "ja-JP"
                                                      )
                                                    : "-"}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                        {deals.length === 0 && (
                            <p className="text-center py-10 text-gray-500">
                                案件が見つかりませんでした。
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
