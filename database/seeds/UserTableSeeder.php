<?php

use Illuminate\Database\Seeder;
use App\User;

class UserTableSeeder extends Seeder
{
    public function run()
    {
        $users= array(
            [
                'name'=>"enderson",
                'email'=>"yunda@gmail.com",
                'password'=>\Hash::make("123456789")
            ],
            [
                'name'=>"yunda007",
                'email'=>"yunda007@hotmail.com",
                'password'=>\Hash::make("123456789")
            ],
        );

        foreach ($users as $user) {
            User::updateOrCreate($user);
        }
    }
}
