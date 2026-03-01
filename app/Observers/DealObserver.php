<?php

namespace App\Observers;

use App\Models\Deal;
use App\Models\ActivityLog;

class DealObserver
{
    public function updated(Deal $deal)
    {
        // getChanges() を使って、 status が変わったかチェックする
        $changes = $deal->getChanges();

        if (array_key_exists('status', $changes)) {
            $oldStatus = $deal->getOriginal('status');
            $newStatus = $deal->status;

            // 数字を日本語に変換するマッピング
            $statusLabels = [
                1 => '見込み',
                2 => 'ヒアリング',
                3 => '提案中',
                4 => '見積提示',
                5 => '受注',
                6 => '失注',
            ];

            $oldLabel = $statusLabels[$oldStatus] ?? "不明({$oldStatus})";
            $newLabel = $statusLabels[$newStatus] ?? "不明({$newStatus})";

            ActivityLog::create([
                'user_id'     => auth()->id() ?? 1,
                'deal_id'     => $deal->id,
                'action'      => 'ステータス更新',
                'description' => "フェーズを 「{$oldLabel}」 から 「{$newLabel}」 に変更しました。",
            ]);
        }
    }
}