<?php

namespace App\Http\Controllers;

use App\Models\Deal; 
use Inertia\Inertia; 
use Illuminate\Http\Request;

class DealController extends Controller
{
    public function index(Request $request)
    {
        // 自分の案件
        $query = Deal::where('user_id', auth()->id());

        // さらに絞り込み（放置・期限切れ）があれば適用
        $query->when($request->filter === 'stale', function ($q) {
            $q->whereIn('status', [1, 2, 3, 4])
            ->where('last_activity_at', '<', now()->subDays(30));
        });

        //かつ、完了予定日が本日以前のもの
        $query->when($request->filter === 'expired', function ($q) {
            $q->whereIn('status', [1, 2, 3, 4])
            ->where('expected_closing_date', '<', now()->toDateString());
        });

        return Inertia::render('Deals/Index', [
            'deals' => $query->with(['company', 'user'])->latest()->get(),
            'filters' => $request->only(['filter']), // React側でどのフィルタ中か知るために渡す
        ]);
    }

    public function update(Request $request, Deal $deal)
    {
        // セキュリティ：自分の案件以外は更新させない
        if ($deal->user_id !== auth()->id()) {
        abort(403);
        }

        $validated = $request->validate([
            'status' => 'required|integer|between:1,6',
        ]);

        // ステータス最終活動日を更新
        $deal->update([
            'status' => $validated['status'],
            'last_activity_at' => now(),
            'last_activity_by' => auth()->id(),
        ]);

    return back()->with('message', '進捗を更新しました');
    }
}