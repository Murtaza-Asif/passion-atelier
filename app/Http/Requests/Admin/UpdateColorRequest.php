<?php
namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class UpdateColorRequest extends FormRequest {
    public function authorize(): bool { return true; }
    public function rules(): array {
        return ['name' => ['required', 'string', 'max:255'], 'hex_code' => ['nullable', 'string', 'max:9', 'regex:/^#([a-fA-F0-9]{3}|[a-fA-F0-9]{6}|[a-fA-F0-9]{8})$/'], 'image' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:1024'], 'status' => ['nullable', 'boolean'], 'sort_order' => ['nullable', 'integer', 'min:0']];
    }
}
