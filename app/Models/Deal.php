<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Deal extends Model
{
    use HasFactory;

    /**
     * 一括指定割り当て可能な属性
     */
    protected $fillable = [
        'company_id',
        'user_id',
        'last_activity_by',
        'contact_id',
        'title',
        'amount',
        'status',
        'expected_closing_date',
        'last_activity_at',
    ];

    /**
     * 属性のキャスト
     */
    protected $casts = [
        'expected_closing_date' => 'date',
        'last_activity_at' => 'datetime',
        'status' => 'integer',
        'amount' => 'integer',
    ];

    /**
     * リレーション：この案件の担当営業（メイン担当者）
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    /**
     * リレーション：最終更新者（ログ履歴用）
     */
    public function lastActor(): BelongsTo
    {
        return $this->belongsTo(User::class, 'last_activity_by');
    }

    /**
     * リレーション：この案件が紐づく企業
     */
    public function company(): BelongsTo
    {
        return $this->belongsTo(Company::class);
    }
}