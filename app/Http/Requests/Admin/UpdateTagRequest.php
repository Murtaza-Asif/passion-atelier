<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateTagRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return ['name' => ['required', 'string', 'max:255', Rule::unique('tags', 'name')->ignore($this->route('tag'))], 'slug' => ['nullable', 'string', 'max:255', Rule::unique('tags', 'slug')->ignore($this->route('tag'))]];
    }
}
