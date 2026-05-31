<?php
namespace App\Services\Admin;
use App\Models\AttributeValue;
class AttributeValueService {
    public function create(array $data): AttributeValue { return AttributeValue::create($data); }
    public function update(AttributeValue $value, array $data): AttributeValue { $value->update($data); return $value->fresh(); }
    public function delete(AttributeValue $value): void { $value->delete(); }
}
