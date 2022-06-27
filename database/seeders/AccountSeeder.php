<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Account;

class AccountSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $account = new Account();
        $account->user_id = 1;
        $account->number = 100;
        $account->save();

        $account = new Account();
        $account->user_id = 2;
        $account->number = 101;
        $account->save();

    }
}
