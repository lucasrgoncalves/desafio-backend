<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Movement;

class MovementSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $movement = new Movement();
        $movement->account_id = 1;
        $movement->movement_type_id = 1;
        $movement->value = '250.00';
        $movement->save();

        $movement = new Movement();
        $movement->account_id = 1;
        $movement->movement_type_id = 2;
        $movement->value = '550.00';
        $movement->save();

        $movement = new Movement();
        $movement->account_id = 1;
        $movement->movement_type_id = 3;
        $movement->value = '50.00';
        $movement->save();

        $movement = new Movement();
        $movement->account_id = 2;
        $movement->movement_type_id = 1;
        $movement->value = '250.00';
        $movement->save();

        $movement = new Movement();
        $movement->account_id = 2;
        $movement->movement_type_id = 2;
        $movement->value = '550.00';
        $movement->save();
       
        $movement = new Movement();
        $movement->account_id = 2;
        $movement->movement_type_id = 3;
        $movement->value = '50.00';
        $movement->save();
    }
}
