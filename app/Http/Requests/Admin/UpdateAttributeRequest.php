<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class UpdateAttributeRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return ['attribute_group_id' => ['nullable', 'integer', 'exists:attribute_groups,id'], 'name' => ['required', 'string', 'max:255'], 'slug' => ['nullable', 'string', 'max:255'], 'description' => ['nullable', 'string', 'max:500'], 'input_type' => ['nullable', 'string', 'in:text,select,multiselect,color'], 'is_filterable' => ['nullable', 'boolean'], 'is_visible_on_front' => ['nullable', 'boolean'], 'is_specification' => ['nullable', 'boolean'], 'sort_order' => ['nullable', 'integer', 'min:0'], 'status' => ['nullable', 'boolean']];
    }
}
