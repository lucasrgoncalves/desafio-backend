<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::put('/userUpdateValue/{userid}', 'App\Http\Controllers\UserController@userUpdateValue');
Route::resource('/user', 'App\Http\Controllers\UserController');
Route::get('/sumMovements/{userid}', 'App\Http\Controllers\MovementController@sumMovements');
Route::get('/movementExport', 'App\Http\Controllers\MovementController@export');
Route::resource('/movement', 'App\Http\Controllers\MovementController');

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });
