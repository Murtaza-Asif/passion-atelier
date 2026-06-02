<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateCollectionRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return ['name' => ['required', 'string', 'max:255'], 'slug' => ['nullable', 'string', 'max:255', Rule::unique('collections', 'slug')->ignore($this->route('collection'))], 'description' => ['nullable', 'string'], 'image' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:2048'], 'banner' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:2048'], 'banner_images' => ['nullable', 'array'], 'banner_images.*' => ['image', 'mimes:jpg,jpeg,png,webp', 'max:2048'], 'meta_title' => ['nullable', 'string', 'max:255'], 'meta_description' => ['nullable', 'string'], 'meta_keywords' => ['nullable', 'string'], 'status' => ['nullable', 'boolean'], 'sort_order' => ['nullable', 'integer', 'min:0']];
    }
}
