<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class StoreFaqRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return ['product_id' => ['required', 'integer', 'exists:products,id'], 'question' => ['required', 'string', 'max:500'], 'answer' => ['required', 'string'], 'sort_order' => ['nullable', 'integer', 'min:0'], 'status' => ['nullable', 'boolean']];
    }
}
