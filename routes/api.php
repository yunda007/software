<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::prefix('/user')->group( function(){
    Route::post('/login', 'api\v1\LoginController@login');  
    Route::middleware('auth:api')->get('/current','api\v1\UserController@current');
    Route::middleware('auth:api')->get('/users','api\v1\UserController@index');
    Route::middleware('auth:api')->post('store','api\v1\UserController@store');
    Route::middleware('auth:api')->put('update','api\v1\UserController@update');
});


