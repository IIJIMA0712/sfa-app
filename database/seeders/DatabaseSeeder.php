<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Company;
use App\Models\Contact;
use App\Models\Deal;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        // 管理者ユーザーを作成
        $me = User::factory()->create([
            'name' => 'Admin',
            'email' => 'admin@example.com',
        ]);

        // 営業メンバーを作成（合計30人）
        $others = User::factory(29)->create();

        // 全ユーザーを一つのコレクションにまとめる
        $allUsers = $others->concat([$me]);

        // 企業を作成
        Company::factory(30)->create()
            ->each(function ($company) use ($allUsers) {
                
                // 各企業に担当者を作成
                $contacts = Contact::factory(3)->create([
                    'company_id' => $company->id
                ]);
    
                // 案件を作成し、営業職員(30人)の中からランダムに割り当てる
                Deal::factory(3)->create([
                    'company_id' => $company->id,
                    'contact_id' => $contacts->random()->id,
                    // 30人の中からランダムに一人選ぶ
                    'user_id' => $allUsers->random()->id, 
                    
                    'last_activity_at' => now()->subDays(rand(0, 45)), 
                    'expected_closing_date' => now()->addDays(rand(-15, 30)),
                ]);
            });
    }
}