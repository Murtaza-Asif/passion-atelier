<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateCategoryRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return ['parent_id' => ['nullable', 'integer', 'exists:categories,id'], 'name' => ['required', 'string', 'max:255'], 'slug' => ['nullable', 'string', 'max:255', Rule::unique('categories', 'slug')->ignore($this->route('category'))], 'description' => ['nullable', 'string'], 'image' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:2048'], 'banner' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:2048'], 'meta_title' => ['nullable', 'string', 'max:255'], 'meta_description' => ['nullable', 'string'], 'meta_keywords' => ['nullable', 'string'], 'status' => ['nullable', 'boolean'], 'sort_order' => ['nullable', 'integer', 'min:0']];
    }
}
