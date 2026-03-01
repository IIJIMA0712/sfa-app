<?php

namespace App\Http\Controllers;

use App\Models\Deal;
use App\Models\ActivityLog;
use Inertia\Inertia;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
        $now = now();
        $userId = auth()->id(); // 自分のIDを取得

    // 担当案件に絞り込む
    $baseQuery = Deal::where('user_id', $userId);

    // 放置案件
    $staleCount = (clone $baseQuery)
        ->whereIn('status', [1, 2, 3, 4])
        ->where('last_activity_at', '<', $now->copy()->subDays(30))
        ->count();

    // 今月の着地予想金額
    $forecastAmount = (clone $baseQuery)
        ->whereIn('status', [1, 2, 3, 4])
        ->whereMonth('expected_closing_date', $now->month)
        ->whereYear('expected_closing_date', $now->year)
        ->sum('amount');

    // 期限切れ案件
    $expiredCount = (clone $baseQuery)
        ->whereIn('status', [1, 2, 3, 4])
        ->where('expected_closing_date', '<', $now->format('Y-m-d'))
        ->count();
    
    // フェーズごとの分布
    $distribution = (clone $baseQuery)
        ->select('status', \DB::raw('count(*) as count'))
        ->groupBy('status')
        ->pluck('count', 'status');
    
    // 最新のログ10件を取得（関連するユーザーと案件も一緒に）
    $activities = ActivityLog::with(['user', 'deal'])
        ->latest()
        ->take(10)
        ->get();

    return Inertia::render('Dashboard', [
        'stats' => [
            'staleCount' => $staleCount,
            'forecastAmount' => (int)$forecastAmount,
            'expiredCount' => $expiredCount,
            'distribution' => $distribution,
        ],
        'activities' => $activities, 
]);
}
}