<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class MovementExportRequest extends FormRequest
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
            'days' => 'nullable | numeric',
            'monthYear' =>  'nullable | string',
            'all' =>  'nullable | string',
        ];
    }

    public function messages()
    {
        return [
            'days.numeric' => 'Quantidade de dias deve ser numérica.',
            'string' => 'Permitido apenas texto.',
        ];
    }
}
