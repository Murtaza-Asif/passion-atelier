<?php
namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class StoreAttributeValueRequest extends FormRequest {
    public function authorize(): bool { return true; }
    public function rules(): array {
        return ['value' => ['required', 'string', 'max:255'], 'slug' => ['nullable', 'string', 'max:255'], 'swatch_value' => ['nullable', 'string', 'max:50'], 'sort_order' => ['nullable', 'integer', 'min:0']];
    }
}
