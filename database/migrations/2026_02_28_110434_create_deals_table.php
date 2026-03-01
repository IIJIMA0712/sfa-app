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
        Schema::create('deals', function (Blueprint $table) {
            $table->id();
            
            // ID紐づけ
            $table->foreignId('company_id')->constrained()->onDelete('cascade');
            //営業担当者
            $table->foreignId('user_id')->nullable()->constrained()->onDelete('set null')->comment('メイン担当者');
            //担当者消えても、案件は消えないように
            $table->foreignId('contact_id')->nullable()->constrained()->onDelete('set null');
            // 最後にアクションを起こした人
            $table->foreignId('last_activity_by')->nullable()->constrained('users')->onDelete('set null')->comment('最終更新者');
        
            // 案件の基本情報
            $table->string('title')->comment('案件名');
            $table->bigInteger('amount')->default(0)->comment('予想受注金額');
            
            //フェーズ管理
            // 1:見込み, 2:ヒアリング, 3:提案中, 4:見積提示, 5:受注, 6:失注
            $table->unsignedTinyInteger('status')->default(1)->index();

            
            // 分析用：完了予定日
            $table->date('expected_closing_date')->nullable()->comment('完了予定日');
            
            // 「放置案件」検知用：最終着手日
            $table->dateTime('last_activity_at')->nullable()->index();
        
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('deals');
    }
};
