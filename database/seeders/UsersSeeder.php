<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user = new User();
        $user->name = "Jorge Sampaio";
        $user->email = 'jorgesamp@gmail.com';
        $user->birthday = '1982-05-22';
        $user->initial_value = "150.00";
        $user->save();

        $user = new User();
        $user->name = "Ana Sobrinho";
        $user->email = 'anasobrinho@outlook.com';
        $user->birthday = '1992-12-01';
        $user->initial_value = "50.00";
        $user->save();

        $user = new User();
        $user->name = "Felipe Albuquerque da Silva";
        $user->email = 'fesilva@hotmail.com';
        $user->birthday = '1996-01-11';
        $user->initial_value = "10.00";
        $user->save();

        $user = new User();
        $user->name = "Plino Correia";
        $user->email = 'plinio@corretoraalianca.com';
        $user->birthday = '1986-11-03';
        $user->initial_value = "15.00";
        $user->save();

        $user = new User();
        $user->name = "Aparecida de Morais";
        $user->email = 'cidmorais@gmail.com';
        $user->birthday = '1965-08-30';
        $user->initial_value = "500.00";
        $user->save();

        $user = new User();
        $user->name = "Sandra Almeida de Castro";
        $user->email = 'sandraalmeida@yahoo.com';
        $user->birthday = '1977-10-12';
        $user->initial_value = "30.00";
        $user->save();

        $user = new User();
        $user->name = "Caio Ferracini";
        $user->email = 'caif@ferrarts.com';
        $user->birthday = '1990-01-18';
        $user->initial_value = "15.00";
        $user->save();

        $user = new User();
        $user->name = "Wendy Felix Andrade";
        $user->email = 'wendyzinha@gmail.com';
        $user->birthday = '2000-09-07';
        $user->initial_value = "0.00";
        $user->save();

        $user = new User();
        $user->name = "Celma do Prado";
        $user->email = 'celmapdrado@hotmail.com';
        $user->birthday = '1969-07-29';
        $user->initial_value = "0.00";
        $user->save();

        $user = new User();
        $user->name = "Pedro Deziderio Sobral";
        $user->email = 'pedesobral@terra.com';
        $user->birthday = '1988-11-11';
        $user->initial_value = "0.00";
        $user->save();
    }
}
