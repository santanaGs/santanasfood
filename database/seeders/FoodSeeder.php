<?php

namespace Database\Seeders;

use App\Models\Food;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class FoodSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        if (!Food::where("name", "Pastel")->first()) {
            Food::create([
                'id_category' => 6,
                'name' => 'Pastel',
                'description' => 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugiat eum quas deleniti a dicta itaque vitae architecto fuga iusto pariatur.',
                'price' => 7.49,
                'image' => null,
            ]);
        }
        if (!Food::where("name", "X-Tudo")->first()) {
            Food::create([
                'id_category' => 6,
                'name' => 'X-Tudo',
                'description' => 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugiat eum quas deleniti a dicta itaque vitae architecto fuga iusto pariatur.',
                'price' => 16.95,
                'image' => null,
            ]);
        }
        if (!Food::where("name", "Pudim")->first()) {
            Food::create([
                'id_category' => 1,
                'name' => 'Pudim',
                'description' => 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugiat eum quas deleniti a dicta itaque vitae architecto fuga iusto pariatur.',
                'price' => 4.99,
                'image' => null,
            ]);
        }
    }
}
