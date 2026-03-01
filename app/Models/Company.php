<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Company extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * 一括指定割り当て可能な属性
     * (安全性確保のため)
     */
    protected $fillable = [
        'name',
        'name_kana',
        'website',
        'postal_code',
        'address_pref',
        'address_city',
        'address_street',
        'industry',
        'status',
        'last_contacted_at',
        'created_by',
        'updated_by',
    ];

    /**
     * 属性のキャスト
     * (DBの文字列や数値を適切な型に変換)
     */
    protected $casts = [
        'last_contacted_at' => 'datetime',
        'status' => 'integer',
    ];

    /**
     * リレーション：この企業に属する担当者
     */
    public function contacts(): HasMany
    {
        return $this->hasMany(Contact::class);
    }

    /**
     * リレーション：この企業に関連する案件
     */
    public function deals(): HasMany
    {
        return $this->hasMany(Deal::class);
    }

    /**
     * リレーション：作成者（ユーザー）
     */
    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}