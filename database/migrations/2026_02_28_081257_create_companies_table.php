<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('companies', function (Blueprint $table) {
            $table->id();
            // 基本情報
            $table->string('name')->comment('企業名');
            $table->string('name_kana')->nullable()->comment('企業名（カナ）');
            $table->string('website')->nullable()->comment('企業HP');

            // 所在地
            $table->string('postal_code', 7)->nullable()->index()->comment('郵便番号');
            $table->string('address_pref')->nullable()->comment('都道府県');
            $table->string('address_city')->nullable()->comment('市区町村');
            $table->string('address_street')->nullable()->comment('番地・ビル名');

            // 属性・管理用
            $table->string('industry')->nullable()->index()->comment('業種');
            $table->unsignedTinyInteger('status')->default(1)->comment('1:有効, 2:取引停止, 3:解約');
            
            // 放置案件検知・可視化
            $table->dateTime('last_contacted_at')->nullable()->comment('最終接触日時');
            
            // 作成者・更新者のトラッキング（権限管理/ACL用）
            $table->foreignId('created_by')->nullable()->constrained('users')->onDelete('set null');
            $table->foreignId('updated_by')->nullable()->constrained('users')->onDelete('set null');

            $table->timestamps();
            $table->softDeletes(); 
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('companies');
    }
};
