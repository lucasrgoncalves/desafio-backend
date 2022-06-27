<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class MovementRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'account_id' => 'required | exists:mysql.desafio.account,id',
            'movement_type_id' =>  'required | exists:mysql.desafio.movement_type,id',
            'value' =>  'required | numeric',
        ];
    }

    public function messages()
    {
        return [
            'required' => 'Campo obrigatório!',
            'account_id.exists' => 'Conta não existe',
            'movement_type_id.exists' => 'Tipo de operação não existe',
            'value.numeric' =>  'Insira um valor númerico'
        ];
    }
}
