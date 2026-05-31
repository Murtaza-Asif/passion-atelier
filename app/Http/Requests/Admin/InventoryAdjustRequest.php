<?php
namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class InventoryAdjustRequest extends FormRequest {
    public function authorize(): bool { return true; }
    public function rules(): array {
        return ['quantity' => ['required', 'integer'], 'type' => ['required', 'string', 'in:added,removed,adjusted'], 'notes' => ['nullable', 'string', 'max:500']];
    }
}
