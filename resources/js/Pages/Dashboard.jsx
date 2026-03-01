import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function Dashboard({ auth, stats, activities }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    ダッシュボード
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* 放置案件のカード */}
                        <Link
                            href={route("deals.index", {
                                filter: "stale",
                            })}
                            className="cursor-pointer transition hover:opacity-80"
                        >
                            <div className="bg-white shadow-sm sm:rounded-lg border-l-4 border-red-500 p-6 text-left">
                                <div className="text-sm font-medium text-gray-500">
                                    放置案件 (30日以上放置) ＞
                                </div>
                                <div className="mt-2 text-3xl font-bold text-red-600">
                                    {stats.staleCount} 件
                                </div>
                            </div>
                        </Link>
                        {/* 期限切れ案件 */}
                        <Link
                            href={route("deals.index", {
                                filter: "expired",
                            })}
                            className="cursor-pointer transition hover:opacity-80"
                        >
                            <div className="bg-white shadow-sm sm:rounded-lg border-l-4 border-amber-500 p-6 text-left">
                                <div className="text-sm font-medium text-gray-500">
                                    期限切れ(完了予定日超過) ＞
                                </div>
                                <div className="mt-2 text-3xl font-bold text-amber-600">
                                    {stats.expiredCount} 件
                                </div>
                            </div>
                        </Link>
                        {/* 着地予想 */}
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg border-l-4 border-blue-500">
                            <div className="p-6 text-gray-900">
                                <div className="text-sm font-medium text-gray-500">
                                    今月の着地予想金額
                                </div>
                                <div className="mt-2 text-3xl font-bold text-blue-600">
                                    ¥{stats.forecastAmount.toLocaleString()}
                                </div>
                            </div>
                        </div>

                        {/* 進捗別集計棒グラフ */}
                        <div className="mt-8 bg-white p-6 shadow-sm rounded-lg">
                            <h3 className="text-lg font-bold mb-4 text-gray-700">
                                案件フェーズ分布
                            </h3>
                            <div className="space-y-4">
                                {[
                                    { id: 1, label: "見込み" },
                                    { id: 2, label: "ヒアリング" },
                                    { id: 3, label: "提案中" },
                                    { id: 4, label: "見積提示" },
                                ].map((phase) => {
                                    const count =
                                        stats.distribution[phase.id] || 0;
                                    // 全体の件数に対する割合を計算（棒の長さ調整）
                                    const total = Object.values(
                                        stats.distribution
                                    ).reduce((a, b) => a + b, 0);
                                    const percentage =
                                        total > 0 ? (count / total) * 100 : 0;
                                    return (
                                        <div key={phase.id}>
                                            <div className="flex justify-between text-sm mb-1">
                                                <span>{phase.label}</span>
                                                <span className="font-bold">
                                                    {count} 件
                                                </span>
                                            </div>
                                            {/* 棒グラフの背景 */}
                                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                                                {/* 色棒 */}
                                                <div
                                                    className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
                                                    style={{
                                                        width: `${percentage}%`,
                                                    }}
                                                ></div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="mt-8 bg-white p-6 shadow-sm rounded-lg">
                        <h3 className="text-lg font-bold mb-4 text-gray-700">
                            最近のアクティビティ
                        </h3>
                        <div className="flow-root overflow-y-auto max-h-[400px]">
                            <ul className="-mb-8">
                                {activities && activities.length > 0 ? (
                                    activities.map((activity, idx) => (
                                        <li key={activity.id}>
                                            <div className="relative pb-8">
                                                {idx !==
                                                    activities.length - 1 && (
                                                    <span
                                                        className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                                                        aria-hidden="true"
                                                    />
                                                )}
                                                <div className="relative flex space-x-3">
                                                    <div>
                                                        <span className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center ring-8 ring-white text-white text-xs font-bold">
                                                            {activity.user?.name?.charAt(
                                                                0
                                                            ) || "U"}
                                                        </span>
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="text-sm text-gray-500">
                                                            <span className="font-medium text-gray-900">
                                                                {
                                                                    activity
                                                                        .user
                                                                        ?.name
                                                                }
                                                            </span>
                                                            <span className="mx-1">
                                                                が
                                                            </span>
                                                            <span className="font-medium text-blue-600">
                                                                {activity.deal
                                                                    ?.title ||
                                                                    "案件"}
                                                            </span>
                                                            <span>を更新</span>
                                                        </div>
                                                        <p className="mt-0.5 text-sm text-gray-600 bg-gray-50 p-2 rounded">
                                                            {
                                                                activity.description
                                                            }
                                                        </p>
                                                        <div className="mt-1 text-xs text-gray-400">
                                                            {new Date(
                                                                activity.created_at
                                                            ).toLocaleString(
                                                                "ja-JP",
                                                                {
                                                                    month: "2-digit",
                                                                    day: "2-digit",
                                                                    hour: "2-digit",
                                                                    minute: "2-digit",
                                                                }
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    ))
                                ) : (
                                    <p className="text-sm text-gray-500">
                                        履歴はまだありません。
                                    </p>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
