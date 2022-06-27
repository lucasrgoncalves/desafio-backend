<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserRequest;
use App\Http\Requests\UserUpdateValueRequest;
use App\Models\Account;
use App\Models\Movement;
use Illuminate\Http\Request;
use App\Models\User;
use DateTime;
use Exception;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{
    public function index(){
        $user = User::orderBy('created_at', 'desc')->paginate(150);
        return response()->json($user, 200);
    }

    public function store(UserRequest $request){
        try {
            $user = new User();
            $user->fill($request->all());
            $birthday = $request->birthday;
            $date = new DateTime($birthday);
            $result = $date->diff( new DateTime( date('Y-m-d')));

            if($result->format('%Y') < 18){
                return response()->json('Apenas maiores de 18 anos podem criar uma conta.', 205);
            }

            $user->save();

            return response()->json($user, 201);            
            
        } catch (\Throwable $th) {
            return response()->json($th->getMessage(), 500);
        }
    }

    public function show($id){
        $user = User::find($id);
        if($user){
            return response()->json($user, 200);
        }
        return response()->json('Usuário não encontrado.', 404);
    }
  
    public function destroy($id){
        try {
            DB::beginTransaction();
            $userdata = User::find($id);

            if(!$userdata){
                throw new Exception("Usuário não encontrado.", 404);
            }
            
            $account = Account::where('user_id', '=', $userdata->id)->first();

            $countMovements = isset($account) && $account->id > 0 ? Movement::where('account_id', '=', $account->id)->count() : 0;

            if($userdata->initial_value > 0 || $countMovements > 0){
                return response()->json('Não foi possível excluir. Usuário possui transações.', 205);
            }

            $user = User::destroy($id);     

            if(!$user > 0){
                throw new Exception("Não foi possível excluir o usuário.", 205);                
            }

            DB::commit();
            return response()->json($user, 200);
            
        } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json($th->getMessage(), $th->getCode());
        }
    }

    public function userUpdateValue(UserUpdateValueRequest $request, $userid){
        try {
            DB::beginTransaction();
            $user = User::find($userid);            
            if(!$user){
                return response()->json('Usuário não encontrado.', 404);
            }
            
            $user->initial_value = $request->initial_value;
            DB::commit();

            return response()->json($user, 200);
            
        } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json($th->getMessage(), $th->getCode());
        }
    }
}
