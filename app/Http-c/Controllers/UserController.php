<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\user;

class UserController extends Controller
{
    public function index () {
        $user = User::all();
        return $user;
    }
}
