<?php

namespace App\Http\Controllers;

use App\Http\Requests\MovementExportRequest;
use App\Http\Requests\MovementRequest;
use App\Models\Account;
use App\Models\Movement;
use App\Models\User;
use Exception;
use Illuminate\Support\Facades\DB;
use Shuchkin\SimpleXLSXGen;

class MovementController extends Controller
{
    public function index(){
        $movements = Movement::with('accounts')->paginate(100);
        return response()->json($movements, 200);
    }

    public function store(MovementRequest $request){
        try {
            $movement = new Movement();
            $movement->fill($request->all());            
            $movement->save();

            return response()->json($movement, 201);            
            
        } catch (\Throwable $th) {
            return response()->json($th->getMessage(), 500);
        }
    }

    public function destroy($id){
        try {
            DB::beginTransaction();
            $movement = Movement::destroy($id);            
            if(!$movement > 0){
                throw new Exception("Nenhuma movimentação para excluir.", 404);                
            }
            DB::commit();
            return response()->json($movement, 200);
            
        } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json($th->getMessage(), $th->getCode());
        }
    }

    public function sumMovements($userid){ // 1-Debito, 2-Credito, 3-Estorno
        
        $credito = 0;
        $debito = 0;
        $estorno = 0;

        try {
            $account = Account::where('user_id', '=', $userid)->first();
            $user = User::where('id', '=', $userid)->first();
            if(!$account || !$user){
                return response()->json('Não foram encontradas movimentações.', 404);
            }

            $data = Movement::select(['movement_type_id', DB::raw('sum(value)')])
                                    ->where('account_id', '=', $account->id)
                                    ->groupBy('movement_type_id')
                                    ->get();

            foreach ($data as $value) {
                if($value->movement_type_id == 1){
                    $debito += $value['sum(value)'];
                }
                if($value->movement_type_id == 2){
                    $credito += $value['sum(value)'];
                }
                if($value->movement_type_id == 3){
                    $estorno += $value['sum(value)'];
                }
            }

            $sum = ($credito - $debito) + $estorno + $user->initial_value;

            if($sum){
                return response()->json($sum, 200);
            }else{
                return response()->json('Não foram encontradas movimentações.', 404);
            }
            
        } catch (\Throwable $th) {
            return response()->json($th->getMessage(), $th->getCode());
        }
    }

    public function export(MovementExportRequest $filters){
        try {
            $header = ['Nome', 'N° da Conta','Tipo de Operação','Valor Movimentacao', 'Data Operação', 'Saldo Inicial', 'E-mail'];
            $movementData[0] = $header;

            if($filters->all == 'all'){
                $data = Movement::with('accounts')->get();
                $tipo = 'TOTAL';
                
                foreach ($data as $value) {
                    if($value->movement_type_id == 1){
                        $operation = "Débito";
                    }else if($value->movement_type_id == 2){
                        $operation = "Crédito";
                    }else{
                        $operation = "Estorno";
                    }
                    $movementData[] = [
                        $value->accounts->users->name,
                        $value->account_id,
                        $operation,
                        $value->value,
                        $value->created_at,
                        $value->accounts->users->initial_value,
                        $value->accounts->users->email,
                    ];
                }
            }

            if($filters->monthYear){
                $tipo = 'MES ' .$filters->monthYear;
                $monthYear = explode('/', $filters->monthYear);
                $month = $monthYear[0];
                $year = $monthYear[1];
                $busca = $year.'-'.$month;

                $data = Movement::where('created_at', 'LIKE', "%{$busca}%")->get();

                if($data && count($data) > 0){
                    foreach ($data as $value) {
                        if($value->movement_type_id == 1){
                            $operation = "Débito";
                        }else if($value->movement_type_id == 2){
                            $operation = "Crédito";
                        }else{
                            $operation = "Estorno";
                        }
                        $movementData[] = [
                            $value->accounts->users->name,
                            $value->account_id,
                            $operation,
                            $value->value,
                            $value->created_at,
                            $value->accounts->users->initial_value,
                            $value->accounts->users->email,
                        ];
                    }
                }else{
                    return response()->json('Não foram encontradas movimentações.', 404);
                }
                
            }

            if($filters->days > 0){
                $tipo = 'ULTIMOS ' .$filters->days. ' DIAS';
                $actual_date    = date("Y-m-d");
                $previous_date = date("Y-m-d", strtotime($actual_date) - ($filters->days * 24 * 60 * 60));

                $data = Movement::where('created_at', '>=', $previous_date)->get();

                foreach ($data as $value) {
                    if($value->movement_type_id == 1){
                        $operation = "Débito";
                    }else if($value->movement_type_id == 2){
                        $operation = "Crédito";
                    }else{
                        $operation = "Estorno";
                    }
                    $movementData[] = [
                        $value->accounts->users->name,
                        $value->account_id,
                        $operation,
                        $value->value,
                        $value->created_at,
                        $value->accounts->users->initial_value,
                        $value->accounts->users->email,
                    ];
                }           
            }

            $date = date('d-m-Y');
            $hour = date('H:i:s');
            $name = "RELATORIO_MOVIMENTACOES-"."$tipo-".$date.'-'.$hour;
            $csv = SimpleXLSXGen::fromArray( $movementData );
            $csv->downloadAs($name.'.csv');
        
        } catch (\Throwable $th) {          
            return response()->json($th->getMessage(), $th->getCode());
        }
      }
    
}
