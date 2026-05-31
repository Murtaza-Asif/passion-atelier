<?php
namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class StoreCouponRequest extends FormRequest {
    public function authorize(): bool { return true; }
    public function rules(): array {
        return ['code' => ['required', 'string', 'max:50', 'unique:coupons,code'], 'type' => ['required', 'string', 'in:percentage,fixed,free_shipping,bxgy'], 'value' => ['nullable', 'numeric', 'min:0'], 'min_order_amount' => ['nullable', 'numeric', 'min:0'], 'max_discount_amount' => ['nullable', 'numeric', 'min:0'], 'usage_limit_per_coupon' => ['nullable', 'integer', 'min:1'], 'usage_limit_per_user' => ['nullable', 'integer', 'min:1'], 'is_stackable' => ['nullable', 'boolean'], 'starts_at' => ['nullable', 'date'], 'expires_at' => ['nullable', 'date', 'after:starts_at'], 'status' => ['nullable', 'boolean'], 'product_ids' => ['nullable', 'array'], 'product_ids.*' => ['integer', 'exists:products,id'], 'category_ids' => ['nullable', 'array'], 'category_ids.*' => ['integer', 'exists:categories,id']];
    }
}
