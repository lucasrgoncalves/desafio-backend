<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\MovementType;

class MovementTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $MovementType_type = new MovementType();
        $MovementType_type->description = "Débito";
        $MovementType_type->save();
        
        $MovementType_type = new MovementType();
        $MovementType_type->description = "Crédito";
        $MovementType_type->save();
        
        $MovementType_type = new MovementType();
        $MovementType_type->description = "Estorno";
        $MovementType_type->save();
    }
}
