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
        Schema::table('users', function (Blueprint $table) {
            // 編集・削除権限フラグ
            // デフォルトは false（権限なし）にして、email列の後ろに配置する
            $table->boolean('can_edit')->default(false)->after('email');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            // ロールバック（取り消し）した時に列を削除する
            $table->dropColumn('can_edit');
        });
    }
};
