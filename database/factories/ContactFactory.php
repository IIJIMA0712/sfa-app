<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Contact>
 */
class ContactFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
{
    return [
        //既存のCompanyからランダムに1つ選ぶ
        'company_id' => \App\Models\Company::factory(), 
        
        'name' => $this->faker->name(),
        'email' => $this->faker->safeEmail(),//実在しないものを取得
        'phone' => $this->faker->phoneNumber(),
        'department' => $this->faker->randomElement(['営業部', '開発部', '人事部', '総務部']),
        'position' => $this->faker->randomElement(['部長', '課長', '係長', '担当']),
        
        // 権限フラグ（キーマン）を20%の確率でtrueにする
        'is_key_person' => $this->faker->boolean(20), 
    ];
}
}
