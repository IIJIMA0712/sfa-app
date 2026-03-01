<?php

namespace Database\Factories;

use App\Models\Company;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class CompanyFactory extends Factory
{
    protected $model = Company::class;

    public function definition(): array
    {
        // 日本語のFakerを利用して、データを生成
        return [
            'name' => $this->faker->company(),
            'name_kana' => $this->faker->kanaName(),
            'website' => $this->faker->url(),
            
            // 所在地
            'postal_code' => $this->faker->postcode(),
            'address_pref' => $this->faker->prefecture(),
            'address_city' => $this->faker->city(),
            'address_street' => $this->faker->streetAddress(),
            
            // 業種
            'industry' => $this->faker->randomElement(['IT・通信', '製造', '建設', '不動産', '商社', '金融']),
            'status' => $this->faker->numberBetween(1, 3), // 1:有効, 2:停止, 3:解約
            
            // 異常検知のテスト用に、ランダムな過去日付を入れる
            'last_contacted_at' => $this->faker->dateTimeBetween('-6 months', 'now'),
            
            // 既存のユーザーIDをランダムに割り当てる（後で調整）
            'created_by' => User::factory(), 
            'updated_by' => User::factory(),
        ];
    }
}