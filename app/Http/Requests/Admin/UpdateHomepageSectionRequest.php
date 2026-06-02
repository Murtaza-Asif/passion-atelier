<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class UpdateHomepageSectionRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return ['section_type' => ['required', 'string', 'in:featured,new_arrivals,best_sellers,trending,recommended,collection_based,custom_category,custom'], 'title' => ['nullable', 'string', 'max:255'], 'description' => ['nullable', 'string', 'max:500'], 'reference_type' => ['nullable', 'string', 'in:collection,category,custom'], 'reference_id' => ['nullable', 'integer'], 'bg_color' => ['nullable', 'string', 'max:50'], 'sort_order' => ['nullable', 'integer', 'min:0'], 'is_active' => ['nullable', 'boolean'], 'product_ids' => ['nullable', 'array'], 'product_ids.*' => ['integer', 'exists:products,id']];
    }
}
