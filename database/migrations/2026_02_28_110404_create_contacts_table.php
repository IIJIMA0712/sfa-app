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
        Schema::create('contacts', function (Blueprint $table) {
            $table->id();
            //ID紐づけ
            $table->foreignId('company_id')->constrained()->onDelete('cascade');
            
            // 基本情報
            $table->string('name')->comment('氏名');
            $table->string('email')->nullable()->comment('メールアドレス');
            $table->string('phone')->nullable()->comment('電話番号');
            $table->string('department')->nullable()->comment('部署名');
            $table->string('position')->nullable()->comment('役職');
        
            // 決済権
            $table->boolean('is_key_person')->default(false)->comment('決裁権限あり');
        
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('contacts');
    }
};
