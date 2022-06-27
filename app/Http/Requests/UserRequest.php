<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Request;

class UserRequest extends FormRequest
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
            'name' =>   'required | min:6',
            'email' =>  'required',
            'birthday' =>  'required | date',
        ];
        
    }

    public function messages()
    {
        return [
            'required' => 'Campo obrigatório!',
            'unique' => 'E-mail já existe',
            'min'   => 'Mínimo 6 caracteres'
        ];
    }
}
