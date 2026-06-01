<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class StoreVariantRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return ['color_id' => ['nullable', 'integer', 'exists:colors,id'], 'name' => ['nullable', 'string', 'max:255'], 'sku' => ['nullable', 'string', 'max:100', 'unique:product_variants,sku'], 'price' => ['nullable', 'numeric', 'min:0'], 'sale_price' => ['nullable', 'numeric', 'min:0'], 'stock' => ['nullable', 'integer', 'min:0'], 'reserved_stock' => ['nullable', 'integer', 'min:0'], 'low_stock_alert' => ['nullable', 'integer', 'min:0'], 'image' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:2048'], 'is_default' => ['nullable', 'boolean'], 'sort_order' => ['nullable', 'integer', 'min:0'], 'status' => ['nullable', 'boolean']];
    }
}
