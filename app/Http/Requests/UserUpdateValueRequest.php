<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserUpdateValueRequest extends FormRequest
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
            'initial_value' =>  'required | numeric',
        ];
    }

    public function messages()
    {
        return [
            'required' => 'Campo obrigatório!',
            'initial_value.numeric' =>  'Insira um valor númerico'
        ];
    }
}
