<?php

namespace App\Http\Controllers\api\v1;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use App\User;
//use Illuminate\Support\Facades\Auth;
use Auth;

class UserController extends Controller
{
    public function current(){
        $user = Auth::user();
        return [
            "user"=> $user,
        ];
    }

    public function index(){
        $users=User::all();
        return [
            'users'=>$users
        ];
    }

    public function store(Request $request ){
        $messages=[
            'email.unique'=>"Este email ya se encuentra registrado."
        ];

        $this->validate(request(),[
            'name'=>['required'],
            'email'=>['required', 'max:100', 'unique:users'],
            'password'=>['required'],
        ], $messages);

        $user= new User();
        $user->name= $request->name;
        $user->email= $request->email;
        $user->password= \Hash::make($request->password);
        $user->save();
        return response()->json(['user'=>$user],200);
    }


    public function update(Request $request ){
        $messages=[
            'email.unique'=>"Este email ya se encuentra registrado."
        ];

        $this->validate(request(),[
            'name'=>['required'],
            'email'=>['required','unique:users,email,'.$request->id],
        ], $messages);
        //para poder dejar el mismo email pero que no se repita
        //tabla(unique:users),campo(email),id(.$request->id)


        $user= User::findOrFail($request->id);
        $user->name= $request->name;
        $user->email= $request->email;
        if ($request->password) {            
            $user->password= \Hash::make($request->password);
        }
        $user->save();
        return response()->json(['user'=>$user],200);
    }


}
