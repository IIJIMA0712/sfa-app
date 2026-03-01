<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Deal>
 */
class DealFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
{
        return [
            'user_id' => \App\Models\User::factory(), 
            'company_id' => \App\Models\Company::factory(),
            'title' => $this->faker->randomElement(['Webページ制作', 'PC貸出', '保守運用', 'ライセンス追加']),
            'amount' => $this->faker->numberBetween(100000, 5000000), // 10万〜500万円
            'status' => $this->faker->numberBetween(1, 6),
            'expected_closing_date' => $this->faker->dateTimeBetween('now', '+6 months'),
            'last_activity_at' => $this->faker->dateTimeBetween('-1 month', 'now'),
        ];
}
}
