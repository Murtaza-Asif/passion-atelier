<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateOfferRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return ['name' => ['required', 'string', 'max:255'], 'slug' => ['nullable', 'string', 'max:255', Rule::unique('offers', 'slug')->ignore($this->route('offer'))], 'type' => ['required', 'string', 'in:percentage,fixed,bxgy'], 'value' => ['nullable', 'numeric', 'min:0'], 'buy_qty' => ['nullable', 'integer', 'min:1'], 'get_qty' => ['nullable', 'integer', 'min:1'], 'get_product_id' => ['nullable', 'integer', 'exists:products,id'], 'min_order_amount' => ['nullable', 'numeric', 'min:0'], 'max_discount_amount' => ['nullable', 'numeric', 'min:0'], 'starts_at' => ['nullable', 'date'], 'expires_at' => ['nullable', 'date', 'after:starts_at'], 'status' => ['nullable', 'boolean'], 'product_ids' => ['nullable', 'array'], 'product_ids.*' => ['integer', 'exists:products,id']];
    }
}
